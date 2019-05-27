const { registerBlockType } = wp.blocks;

const { __ } = wp.i18n;

const { RangeControl, Spinner, Button, ToggleControl, Tooltip, Placeholder, Toolbar, ColorPicker, ColorPalette, BaseControl, Panel, PanelBody, PanelRow } = wp.components;

const { InspectorControls, BlockControls } = wp.editor;

import DynamicTermsModal from './dynamic-terms-modal.js';
import tainacan from '../../api-client/axios.js';
import axios from 'axios';
import qs from 'qs';

registerBlockType('tainacan/dynamic-terms-list', {
    title: __('Tainacan Taxonomy\'s terms List', 'tainacan'),
    icon:
        <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24"
                height="24px"
                width="24px">
            <path 
                    fill="#298596"
                    d="M21.43,13.64,19.32,16a2.57,2.57,0,0,1-2,1H11a3.91,3.91,0,0,0,0-.49,5.49,5.49,0,0,0-5-5.47V9.64A2.59,2.59,0,0,1,8.59,7H17.3a2.57,2.57,0,0,1,2,1l2.11,2.38A2.59,2.59,0,0,1,21.43,13.64ZM4,3A2,2,0,0,0,2,5v7.3a5.32,5.32,0,0,1,2-1V5H16V3ZM11,21l-1,1L8.86,20.89,8,20H8l-.57-.57A3.42,3.42,0,0,1,5.5,20a3.5,3.5,0,0,1,0-7,2.74,2.74,0,0,1,.5,0A3.5,3.5,0,0,1,9,16a2.92,2.92,0,0,1,0,.51,3.42,3.42,0,0,1-.58,1.92L9,19H9l.85.85Zm-4-4.5A1.5,1.5,0,1,0,5.5,18,1.5,1.5,0,0,0,7,16.53Z"/>
        </svg>,
    category: 'tainacan-blocks',
    keywords: [ __( 'terms', 'tainacan' ), __( 'search', 'tainacan' ), __( 'taxonomy', 'tainacan' ) ],
    attributes: {
        content: {
            type: 'array',
            source: 'children',
            selector: 'div'
        },
        taxonomyId: {
            type: String,
            default: undefined
        },
        terms: {
            type: Array,
            default: []
        },
        showImage: {
            type: Boolean,
            default: true
        },
        showName: {
            type: Boolean,
            default: true
        },
        layout: {
            type: String,
            default: 'grid'
        },
        isModalOpen: {
            type: Boolean,
            default: false
        },
        gridMargin: {
            type: Number,
            default: 0
        },
        termsRequestSource: {
            type: String,
            default: undefined
        },
        maxTermsNumber: {
            type: Number,
            value: undefined
        },
        isLoading: {
            type: Boolean,
            value: false
        },
        isLoadingTaxonomy: {
            type: Boolean,
            value: false
        },
        showSearchBar: {
            type: Boolean,
            value: false
        },
        showTaxonomyHeader: {
            type: Boolean,
            value: false
        },
        showTaxonomyLabel: {
            type: Boolean,
            value: false
        },
        taxonomy: {
            type: Object,
            value: undefined
        },
        searchString: {
            type: String,
            default: undefined
        },
        order: {
            type: String,
            default: undefined
        },
        blockId: {
            type: String,
            default: undefined
        },
        taxonomyBackgroundColor: {
            type: String,
            default: "#454647"
        },
        taxonomyTextColor: {
            type: String,
            default: "#ffffff"
        }
    },
    supports: {
        align: ['full', 'wide'],
        html: false,
    },
    edit({ attributes, setAttributes, className, isSelected, clientId }){
        let {
            terms, 
            content, 
            taxonomyId,  
            showImage,
            showName,
            layout,
            isModalOpen,
            gridMargin,
            termsRequestSource,
            maxTermsNumber,
            order,
            searchString,
            isLoading,
            showSearchBar,
            isLoadingTaxonomy,
            taxonomy,
        } = attributes;

        // Obtains block's client id to render it on save function
        setAttributes({ blockId: clientId });
        
        function prepareTerm(term) {
            return (
                <li 
                    key={ term.id }
                    className="term-list-item"
                    style={{ marginBottom: layout == 'grid' ? (showName ? gridMargin + 12 : gridMargin) + 'px' : ''}}>      
                    <a 
                        id={ isNaN(term.id) ? term.id : 'term-id-' + term.id }
                        href={ term.url } 
                        target="_blank"
                        className={ (!showName ? 'term-without-name' : '') + ' ' + (!showImage ? 'term-without-image' : '') }>
                        <img
                            src={ term.header_image ? term.header_image : `${tainacan_plugin.base_url}/admin/images/placeholder_square.png` }
                            alt={ term.name ? term.name : __( 'Thumbnail', 'tainacan' ) }/>
                        <span>{ term.name ? term.name : '' }</span>
                    </a>
                </li>
            );
        }

        function setContent(){

            terms = [];
            isLoading = true;
            
            if (termsRequestSource != undefined && typeof termsRequestSource == 'function')
                termsRequestSource.cancel('Previous terms search canceled.');

            termsRequestSource = axios.CancelToken.source();
            
            setAttributes({
                isLoading: isLoading
            });

            let endpoint = '/taxonomy/' + taxonomyId + '/terms/?order=asc&hideempty=0&number=12';
            let query = endpoint.split('?')[1];
            let queryObject = qs.parse(query);

            // Set up max terms to be shown
            if (maxTermsNumber != undefined && maxTermsNumber > 0)
                queryObject.number = maxTermsNumber;
            else if (queryObject.number != undefined && queryObject.number > 0)
                setAttributes({ maxTermsNumber: queryObject.number });
            else {
                queryObject.number = 12;
                setAttributes({ maxTermsNumber: 12 });
            }

            // Set up sorting order
            if (order != undefined)
                queryObject.order = order;
            else if (queryObject.order != undefined)
                setAttributes({ order: queryObject.order });
            else {
                queryObject.order = 'asc';
                setAttributes({ order: 'asc' });
            }

            // Set up search
            if (searchString != undefined)
                queryObject.searchterm = searchString;
            else if (queryObject.searchterm != undefined)
                setAttributes({ searchString: queryObject.search });
            else {
                delete queryObject.searchterm;
                setAttributes({ searchString: undefined });
            }
            
            endpoint = endpoint.split('?')[0] + '?' + qs.stringify(queryObject);
            
            tainacan.get(endpoint, { cancelToken: termsRequestSource.token })
                .then(response => {

                    for (let term of response.data)
                        terms.push(prepareTerm(term));

                    setAttributes({
                        content: <div></div>,
                        terms: terms,
                        isLoading: false,
                        termsRequestSource: termsRequestSource
                    });
                });
        }

        function openDynamicTermsModal() {
            isModalOpen = true;
            setAttributes( { 
                isModalOpen: isModalOpen
            } );
        }

        function updateLayout(newLayout) {
            layout = newLayout;

            if (layout == 'grid' && showImage == false)
                showImage = true;

            if (layout == 'list' && showName == false)
                showName = true;

            setAttributes({ 
                layout: layout, 
                showImage: showImage,
                showName: showName
            });
            setContent();
        }

        function applySearchString(event) {

            let value = event.target.value;

            if (searchString != value) {
                searchString = value;
                setAttributes({ searchString: searchString });
                setContent();
            }
        }

        // Executed only on the first load of page
        if(content && content.length && content[0].type)
            setContent();

        const layoutControls = [
            {
                icon: 'grid-view',
                title: __( 'Grid View' ),
                onClick: () => updateLayout('grid'),
                isActive: layout === 'grid',
            },
            {
                icon: 'list-view',
                title: __( 'List View' ),
                onClick: () => updateLayout('list'),
                isActive: layout === 'list',
            }
        ];

        return (
            <div className={className}>

                <div>
                    <BlockControls>
                        <Toolbar controls={ layoutControls } />
                    </BlockControls>
                </div>

                <div>
                    <InspectorControls>
                        
                        <PanelBody
                                title={__('Search bar', 'tainacan')}
                                initialOpen={ true }
                            >
                            <ToggleControl
                                label={__('Display bar', 'tainacan')}
                                help={ showSearchBar ? __('Toggle to show search bar on block', 'tainacan') : __('Do not show search bar', 'tainacan')}
                                checked={ showSearchBar }
                                onChange={ ( isChecked ) => {
                                        showSearchBar = isChecked;
                                        setAttributes({ showSearchBar: showSearchBar });
                                    } 
                                }
                            />
                        </PanelBody>
                        <PanelBody
                                title={__('Terms', 'tainacan')}
                                initialOpen={ true }
                            >
                            <div>
                                <RangeControl
                                    label={__('Maximum number of terms', 'tainacan')}
                                    value={ maxTermsNumber }
                                    onChange={ ( aMaxTermsNumber ) => {
                                        maxTermsNumber = aMaxTermsNumber;
                                        setAttributes( { maxTermsNumber: aMaxTermsNumber } ) 
                                        setContent();
                                    }}
                                    min={ 1 }
                                    max={ 96 }
                                />
                            </div>
                            <hr></hr>
                            <div>
                                { layout == 'list' ? 
                                    <ToggleControl
                                        label={__('Image', 'tainacan')}
                                        help={ showImage ? __("Toggle to show term's image", 'tainacan') : __("Do not show term's image", 'tainacan')}
                                        checked={ showImage }
                                        onChange={ ( isChecked ) => {
                                                showImage = isChecked;
                                                setAttributes({ showImage: showImage });
                                                setContent();
                                            } 
                                        }
                                    /> 
                                : null }
                                { layout == 'grid' ?
                                    <div>
                                        <ToggleControl
                                            label={__("Term's name", 'tainacan')}
                                            help={ showName ? __("Toggle to show term's name", 'tainacan') : __("Do not show term's name", 'tainacan')}
                                            checked={ showName }
                                            onChange={ ( isChecked ) => {
                                                    showName = isChecked;
                                                    setAttributes({ showName: showName });
                                                    setContent();
                                                } 
                                            }
                                        />
                                        <div style={{ marginTop: '16px'}}>
                                            <RangeControl
                                                label={__('Margin between terms in pixels', 'tainacan')}
                                                value={ gridMargin }
                                                onChange={ ( margin ) => {
                                                    gridMargin = margin;
                                                    setAttributes( { gridMargin: margin } ) 
                                                    setContent();
                                                }}
                                                min={ 0 }
                                                max={ 48 }
                                            />
                                        </div>
                                    </div>
                                : null }
                            </div>
                        </PanelBody>
                    </InspectorControls>
                </div>

                { isSelected ? 
                    (
                    <div>
                        { isModalOpen ? 
                            <DynamicTermsModal
                                existingTaxonomyId={ taxonomyId }
                                onSelectTaxonomy={ (selectedTaxonomyId) => {
                                    taxonomyId = selectedTaxonomyId;
                                    setAttributes({ 
                                        taxonomyId: taxonomyId,
                                        isModalOpen: false 
                                    });
                                    setContent();
                                }}
                                onCancelSelection={ () => setAttributes({ isModalOpen: false }) }/> 
                            : null
                        }
                        
                        { terms.length ? (
                            <div className="block-control">
                                <p>
                                    <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            viewBox="0 0 24 24"
                                            height="24px"
                                            width="24px">
                                        <path 
                                                fill="#298596"
                                                d="M21.43,13.64,19.32,16a2.57,2.57,0,0,1-2,1H11a3.91,3.91,0,0,0,0-.49,5.49,5.49,0,0,0-5-5.47V9.64A2.59,2.59,0,0,1,8.59,7H17.3a2.57,2.57,0,0,1,2,1l2.11,2.38A2.59,2.59,0,0,1,21.43,13.64ZM4,3A2,2,0,0,0,2,5v7.3a5.32,5.32,0,0,1,2-1V5H16V3ZM11,21l-1,1L8.86,20.89,8,20H8l-.57-.57A3.42,3.42,0,0,1,5.5,20a3.5,3.5,0,0,1,0-7,2.74,2.74,0,0,1,.5,0A3.5,3.5,0,0,1,9,16a2.92,2.92,0,0,1,0,.51,3.42,3.42,0,0,1-.58,1.92L9,19H9l.85.85Zm-4-4.5A1.5,1.5,0,1,0,5.5,18,1.5,1.5,0,0,0,7,16.53Z"/>
                                    </svg>
                                    {__('Dynamically list terms from a Tainacan terms search', 'tainacan')}
                                </p>
                                <Button
                                    isPrimary
                                    type="submit"
                                    onClick={ () => openDynamicTermsModal() }>
                                    {__('Configure search', 'tainacan')}
                                </Button>    
                            </div>
                            ): null
                        }
                    </div>
                    ) : null
                }
                   
                {
                    showSearchBar ?
                    <div class="dynamic-terms-search-bar">
                        <Button
                            onClick={ () => { order = 'asc'; setAttributes({ order: order }); setContent(); }}
                            className={order == 'asc' ? 'sorting-button-selected' : ''}
                            label={__('Sort ascending', 'tainacan')}>
                            <span class="icon">
                                <i>
                                    <svg width="24" height="24" viewBox="-2 -4 20 20">
                                    <path d="M6.7,10.8l-3.3,3.3L0,10.8h2.5V0h1.7v10.8H6.7z M11.7,0.8H8.3v1.7h3.3V0.8z M14.2,5.8H8.3v1.7h5.8V5.8z M16.7,10.8H8.3v1.7	h8.3V10.8z"/>       
                                    </svg>
                                </i>
                            </span>
                        </Button>  
                        <Button
                            onClick={ () => { order = 'desc'; setAttributes({ order: order }); setContent(); }}
                            className={order == 'desc' ? 'sorting-button-selected' : ''}
                            label={__('Sort descending', 'tainacan')}>
                            <span class="icon">
                                <i>
                                    <svg width="24" height="24" viewBox="-2 -4 20 20">
                                    <path d="M6.7,3.3H4.2v10.8H2.5V3.3H0L3.3,0L6.7,3.3z M11.6,2.5H8.3v1.7h3.3V2.5z M14.1,7.5H8.3v1.7h5.8V7.5z M16.6,12.5H8.3v1.7 h8.3V12.5z"/>
                                    </svg>
                                </i>
                            </span>
                        </Button>  
                        <Button
                            onClick={ () => { setContent(); }}
                            label={__('Search', 'tainacan')}>
                            <span class="icon">
                                <i>
                                    <svg width="24" height="24" viewBox="-2 -4 20 20">
                                    <path class="st0" d="M0,5.8C0,5,0.2,4.2,0.5,3.5s0.7-1.3,1.2-1.8s1.1-0.9,1.8-1.2C4.2,0.1,5,0,5.8,0S7.3,0.1,8,0.5
                                        c0.7,0.3,1.3,0.7,1.8,1.2s0.9,1.1,1.2,1.8c0.5,1.2,0.5,2.5,0.2,3.7c0,0.2-0.1,0.4-0.2,0.6c0,0.1-0.2,0.6-0.2,0.6
                                        c0.6,0.6,1.3,1.3,1.9,1.9c0.7,0.7,1.3,1.3,2,2c0,0,0.3,0.2,0.3,0.3c0,0.3-0.1,0.7-0.3,1c-0.2,0.6-0.8,1-1.4,1.2
                                        c-0.1,0-0.6,0.2-0.6,0.1c0,0-4.2-4.2-4.2-4.2c0,0-0.8,0.3-0.8,0.4c-1.3,0.4-2.8,0.5-4.1-0.1c-0.7-0.3-1.3-0.7-1.8-1.2
                                        C1.2,9.3,0.8,8.7,0.5,8S0,6.6,0,5.8z M1.6,5.8c0,0.4,0.1,0.9,0.2,1.3C2.1,8.2,3,9.2,4.1,9.6c0.5,0.2,1,0.3,1.6,0.3
                                        c0.6,0,1.1-0.1,1.6-0.3C8.7,9,9.7,7.6,9.8,6c0.1-1.5-0.6-3.1-2-3.9c-0.9-0.5-2-0.6-3-0.4C4.6,1.8,4.4,1.9,4.1,2
                                        c-0.5,0.2-1,0.5-1.4,0.9C2,3.7,1.6,4.7,1.6,5.8z"/>       
                                    </svg>
                                </i>
                            </span>
                        </Button>
                        <input
                                value={ searchString }
                                onChange={ (value) =>  { _.debounce(applySearchString(value), 300); } }
                                type="text"/>
                        <Tooltip text={__('If necessary, pagination will be available on post or page.', 'tainacan')}>
                            <button
                                    class="previous-button"
                                    disabled
                                    label={__('Previous page', 'tainacan')}>
                                <span class="icon">
                                    <i>
                                        <svg
                                                width="30"
                                                height="30"
                                                viewBox="0 2 20 20">
                                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                                            <path
                                                    d="M0 0h24v24H0z"
                                                    fill="none"/>                        
                                        </svg>
                                    </i>
                                </span>
                            </button>
                        </Tooltip> 
                        <Tooltip text={__('If necessary, pagination will be available on post or page.', 'tainacan')}>
                            <button
                                    class="next-button"
                                    disabled
                                    label={__('Next page', 'tainacan')}>
                                <span class="icon">
                                    <i>
                                        <svg
                                                width="30"
                                                height="30"
                                                viewBox="0 2 20 20">
                                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                                            <path
                                                    d="M0 0h24v24H0z"
                                                    fill="none"/>                        
                                        </svg>
                                    </i>
                                </span>
                            </button>   
                        </Tooltip>
                    </div>
                : null
                }

                { !terms.length && !isLoading ? (
                    <Placeholder
                        icon={(
                            <img
                                width={148}
                                src={ `${tainacan_plugin.base_url}/admin/images/tainacan_logo_header.svg` }
                                alt="Tainacan Logo"/>
                        )}>
                        <p>
                        <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24"
                                height="24px"
                                width="24px">
                            <path 
                                    fill="#298596"
                                    d="M21.43,13.64,19.32,16a2.57,2.57,0,0,1-2,1H11a3.91,3.91,0,0,0,0-.49,5.49,5.49,0,0,0-5-5.47V9.64A2.59,2.59,0,0,1,8.59,7H17.3a2.57,2.57,0,0,1,2,1l2.11,2.38A2.59,2.59,0,0,1,21.43,13.64ZM4,3A2,2,0,0,0,2,5v7.3a5.32,5.32,0,0,1,2-1V5H16V3ZM11,21l-1,1L8.86,20.89,8,20H8l-.57-.57A3.42,3.42,0,0,1,5.5,20a3.5,3.5,0,0,1,0-7,2.74,2.74,0,0,1,.5,0A3.5,3.5,0,0,1,9,16a2.92,2.92,0,0,1,0,.51,3.42,3.42,0,0,1-.58,1.92L9,19H9l.85.85Zm-4-4.5A1.5,1.5,0,1,0,5.5,18,1.5,1.5,0,0,0,7,16.53Z"/>
                        </svg>
                            {__('Dynamically list terms from a Tainacan terms search', 'tainacan')}
                        </p>
                        <Button
                            isPrimary
                            type="submit"
                            onClick={ () => openDynamicTermsModal() }>
                            {__('Select terms', 'tainacan')}
                        </Button>   
                    </Placeholder>
                    ) : null
                }
                
                { isLoading ? 
                    <div class="spinner-container">
                        <Spinner />
                    </div> :
                    <div>
                        <ul 
                            style={{ 
                                gridTemplateColumns: layout == 'grid' ? 'repeat(auto-fill, ' +  (gridMargin + (showName ? 220 : 185)) + 'px)' : 'inherit'
                            }}
                            className={'terms-list-edit terms-layout-' + layout + (!showName ? ' terms-list-without-margin' : '')}>
                            { terms }
                        </ul>
                    </div>
                }
            </div>
        );
    },
    save({ attributes, className }){
        const {
            content, 
            blockId,
            taxonomyId,  
            showImage,
            showName,
            layout,
            gridMargin,
            maxTermsNumber,
            order,
            showSearchBar
        } = attributes;
        
        return <div 
                    className={ className }
                    taxonomy-id={ taxonomyId }  
                    show-image={ '' + showImage }
                    show-name={ '' + showName }
                    show-search-bar={ '' + showSearchBar }
                    layout={ layout }
                    grid-margin={ gridMargin }
                    max-terms-number={ maxTermsNumber }
                    order={ order }
                    tainacan-api-root={ tainacan_plugin.root }
                    tainacan-base-url={ tainacan_plugin.base_url }
                    id={ 'wp-block-tainacan-dynamic-terms-list_' + blockId }>
                        { content }
                </div>
    }
});