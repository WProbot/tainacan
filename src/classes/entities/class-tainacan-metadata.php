<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

class Tainacan_Metadata extends Tainacan_Entity {

    use Tainacan_Entity_Collection_Relation;
    
    function __construct( $which = 0 ) {

        $this->repository = 'Tainacan_Metadatas';

        if ( is_numeric( $which ) && $which > 0) {
            $post = get_post( $which );
            if ( $post instanceof WP_Post) {
                $this->WP_Post = get_post( $which );
            }

        } elseif ( $which instanceof WP_Post ) {
            $this->WP_Post = $which;
        } else {
            $this->WP_Post = new StdClass();
        }

    }

    // Getters
    function get_id() {
        return $this->get_mapped_property('ID');
    }


    function get_name() {
        return $this->get_mapped_property('name');
    }

    function get_order() {
        return $this->get_mapped_property('order');
    }

    function get_parent() {
        return $this->get_mapped_property('parent');
    }

    function get_description() {
        return $this->get_mapped_property('description');
    }

    function get_required(){
        return $this->get_mapped_property('required');
    }
    
    function get_multiple(){
        return $this->get_mapped_property('multiple');
    }
    
    function get_cardinality(){
        return $this->get_mapped_property('cardinality');
    }
    
    function get_collection_key(){
        return $this->get_mapped_property('collection_key');
    }

    function get_mask(){
        return $this->get_mapped_property('mask');
    }

    function get_privacy(){
        return $this->get_mapped_property('privacy');
    }

    function get_default_value(){
        return $this->get_mapped_property('default_value');
    }

    function get_type( $output = 'object' ){
        if( $output === 'object'){
            return unserialize( $this->get_mapped_property('option') );
        }else{
            return $this->get_mapped_property('type');
        }
    }

    // Setters
    function set_name($value) {
        return $this->set_mapped_property('name', $value);
    }

    function set_order($value) {
        return $this->set_mapped_property('order', $value);
    }

    function set_parent($value) {
        return $this->set_mapped_property('parent', $value);
    }

    function set_description($value) {
        return $this->set_mapped_property('description', $value);
    }

    function set_required( $value ){
        return $this->set_mapped_property('required', $value);
    }
    
    function set_multiple( $value ){
        return $this->set_mapped_property('multiple', $value);
    }
    
    function set_cardinality( $value ){
        return $this->set_mapped_property('cardinality', $value);
    }
    
    function set_collection_key( $value ){
        return $this->set_mapped_property('collection_key', $value);
    }

    function set_mask( $value ){
        return $this->set_mapped_property('mask', $value);
    }

    function set_privacy( $value ){
        return $this->set_mapped_property('privacy', $value);
    }

    function set_default_value( $value ){
        return $this->set_mapped_property('default_property', $value);
    }

    function set_type($value){
        if( is_object( $value ) && is_subclass_of( $value, 'Tainacan_Field_Type' ) ){
            $this->set_option( $value );
            return $this->set_mapped_property('type', get_class( $value ) ) ;
        }
        return null;
    }

    function set_option($value){
        return $this->set_mapped_property('option',  serialize($value) ) ;
    }

    // helpers
    function is_multiple() {
        return $this->get_multiple() === 'yes';
    }
    
    function is_collection_key() {
        return $this->get_collection_key() === 'yes';
    }
    
    function is_required() {
        return $this->get_required() === 'yes';
    }
}