<template>
    <div class="table-container">
        <div class="table-wrapper">

            <!-- Empty result placeholder -->
            <section
                    v-if="!isLoading && items.length <= 0"
                    class="section">
                <div class="content has-text-gray4 has-text-centered">
                    <p>
                        <span class="icon is-large">
                            <i class="tainacan-icon tainacan-icon-36px tainacan-icon-items" />
                        </span>
                    </p>
                    <p>{{ $i18n.get('info_no_item_found') }}</p>
                </div>
            </section>

            <!-- SKELETON LOADING -->
            <div
                    v-if="isLoading"
                    class="tainacan-cards-container">
                <div 
                        :key="item"
                        v-for="item in 12"
                        class="skeleton tainacan-card" />
            </div>

            <!-- CARDS VIEW MODE -->
            <div 
                    role="list"
                    v-if="!isLoading && items.length > 0"
                    class="tainacan-cards-container">
                <!-- <div> -->
                <a
                        role="listitem"
                        :key="index"
                        v-for="(item, index) of items"
                        class="tainacan-card"
                        :href="getItemLink(item.url, index)">                                
                    <!-- Title -->
                    <div class="metadata-title">
                        <p 
                                v-tooltip="{
                                    delay: {
                                        show: 500,
                                        hide: 300,
                                    },
                                    content: item.title != undefined ? item.title : '',
                                    html: true,
                                    autoHide: false,
                                    placement: 'auto-start'
                                }">
                            {{ item.title != undefined ? item.title : '' }}
                        </p>                            
                    </div>
                    <!-- Remaining metadata -->  
                    <div class="media">
                        <div 
                                :style="{ backgroundImage: 'url(' + (item['thumbnail']['tainacan-medium'] ? item['thumbnail']['tainacan-medium'][0] : (item['thumbnail'].medium ? item['thumbnail'].medium[0] : thumbPlaceholderPath)) + ')' }"
                                class="card-thumbnail">
                            <img 
                                    :alt="$i18n.get('label_thumbnail')"
                                    v-if="item.thumbnail != undefined"
                                    :src="item['thumbnail']['tainacan-medium'] ? item['thumbnail']['tainacan-medium'][0] : (item['thumbnail'].medium ? item['thumbnail'].medium[0] : thumbPlaceholderPath)">  
                        </div>
                        <div class="skeleton"/>
                        
                        <div class="list-metadata media-body">
                           <!-- Description -->
                            <p 
                                    v-tooltip="{
                                        delay: {
                                            show: 500,
                                            hide: 300,
                                        },
                                        content: item.description != undefined && item.description != '' ? item.description : `<span class='has-text-gray3 is-italic'>` + $i18n.get('label_description_not_informed') + `</span>`,
                                        html: true,
                                        autoHide: false,
                                        placement: 'auto-start'
                                    }"   
                                    class="metadata-description"
                                    v-html="item.description != undefined && item.description != '' ? getLimitedDescription(item.description) : `<span class='has-text-gray3 is-italic'>` + $i18n.get('label_description_not_informed') + `</span>`" />                                                        
                            <br>
                            <!-- Author and Creation Date-->
<!--                            <p 
                                    v-tooltip="{
                                        delay: {
                                            show: 500,
                                            hide: 300,
                                        },
                                        content: column.metadatum == 'row_author' || column.metadatum == 'row_creation',
                                        html: false,
                                        autoHide: false,
                                        placement: 'auto-start'
                                    }"   
                                    v-for="(column, index) in displayedMetadata"
                                    :key="index"
                                    v-if="column.metadatum == 'row_author' || column.metadatum == 'row_creation'"
                                    class="metadata-author-creation">   
                                {{ column.metadatum == 'row_author' ? $i18n.get('info_created_by') + ' ' + item[column.slug] : $i18n.get('info_date') + ' ' + item[column.slug] }}
                            </p>   
-->                       
                        </div>
                    </div>
               
                </a>
                <!-- </div> -->
            </div>
        </div> 
    </div>
</template>

<script>
import { viewModesMixin } from '../js/view-modes-mixin.js';

export default {
    name: 'ViewModeCards',
    mixins: [
        viewModesMixin
    ],
    props: {
        collectionId: Number,
        displayedMetadata: Array,
        items: Array,
        isLoading: false
    },
    methods: {
        getLimitedDescription(description) {
            let maxCharacter = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) <= 480 ? 155 : 330;
            return description.length > maxCharacter ? description.substring(0, maxCharacter - 3) + '...' : description;
        }
    }
}
</script>

<style  lang="scss" scoped>

    // Grid mixin for display: grid compatibility
    @mixin display-grid {
        flex-wrap: wrap;
        display: flex;
        display: -ms-grid;
        display: grid;
    }

    @import "../../admin/scss/_view-mode-cards.scss";

    .tainacan-cards-container .tainacan-card .metadata-title {
        padding: 0.6em 0.75em;
        margin-bottom: 0px;
    }
</style>


