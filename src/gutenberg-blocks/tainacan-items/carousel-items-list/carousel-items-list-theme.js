import Vue from 'vue';
import CarouselItemsListTheme from './carousel-items-list-theme.vue';

// This is rendered on the theme side.
document.addEventListener("DOMContentLoaded", () => {

    // Configure Vue logic before passing it to constructor:
    let vueOptions = {
        data: {
            collectionId: '',  
            searchURL: '',
            maxItemsNumber: 12,
            autoPlay: false,
            autoPlaySpeed: 3,
            loopSlides: false,
            showCollectionHeader: false,
            showCollectionLabel: false,
            collectionBackgroundColor: '#454647',
            collectionTextColor: '#ffffff',
            tainacanApiRoot: '',
            tainacanBaseUrl: '',
            className: ''
        },
        render(h){ 
            return h(CarouselItemsListTheme, {
                props: {
                    collectionId: this.collectionId,  
                    searchURL: this.searchURL,
                    maxItemsNumber: this.maxItemsNumber,
                    autoPlay: this.autoPlay,
                    autoPlaySpeed: this.autoPlaySpeed,
                    loopSlides: this.loopSlides,
                    showCollectionHeader: this.showCollectionHeader,
                    showCollectionLabel: this.showCollectionLabel,
                    collectionBackgroundColor: this.collectionBackgroundColor,
                    collectionTextColor: this.collectionTextColor,
                    tainacanApiRoot: this.tainacanApiRoot,
                    tainacanBaseUrl: this.tainacanBaseUrl,
                    className: this.className    
                }
            });
        },
        beforeMount () {
            this.className = this.$el.attributes.class != undefined ? this.$el.attributes.class.value : undefined;
            this.searchURL = this.$el.attributes['search-url'] != undefined ? this.$el.attributes['search-url'].value : undefined;
            this.collectionId = this.$el.attributes['collection-id'] != undefined ? this.$el.attributes['collection-id'].value : undefined;
            this.maxItemsNumber = this.$el.attributes['max-items-number'] != undefined ? this.$el.attributes['max-items-number'].value : undefined;
            this.autoPlay = this.$el.attributes['auto-play'] != undefined ? this.$el.attributes['auto-play'].value == 'true' : false;
            this.autoPlaySpeed = this.$el.attributes['auto-play-speed'] != undefined ? this.$el.attributes['auto-play-speed'].value : undefined;
            this.loopSlides = this.$el.attributes['loop-slides'] != undefined ? this.$el.attributes['loop-slides'].value == 'true' : false;
            this.showCollectionHeader = this.$el.attributes['show-collection-header'] != undefined ? this.$el.attributes['show-collection-header'].value == 'true' : false;
            this.showCollectionLabel = this.$el.attributes['show-collection-label'] != undefined ? this.$el.attributes['show-collection-label'].value == 'true' : false;
            this.collectionBackgroundColor = this.$el.attributes['collection-background-color'] != undefined ? this.$el.attributes['collection-background-color'].value : undefined;
            this.collectionTextColor = this.$el.attributes['collection-text-color'] != undefined ? this.$el.attributes['collection-text-color'].value : undefined;
            this.tainacanApiRoot = this.$el.attributes['tainacan-api-root'] != undefined ? this.$el.attributes['tainacan-api-root'].value : undefined;
            this.tainacanBaseUrl = this.$el.attributes['tainacan-base-url'] != undefined ? this.$el.attributes['tainacan-base-url'].value : undefined;
        },
        methods: {
            __(text, domain) {
                return wp.i18n.__(text, domain);
            }
        }
    };

    // Gets all divs with content created by our block;
    let blocks = document.getElementsByClassName('wp-block-tainacan-carousel-items-list');
    
    if (blocks) {
        let blockIds = Object.values(blocks).map((block) => block.id);

        // Creates a new Vue Instance to manage each block isolatelly
        for (let blockId of blockIds) {
            new Vue( Object.assign({ el: '#' + blockId }, jQuery.extend(true, {}, vueOptions)) );
        }
    }
});