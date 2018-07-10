<?php

namespace Tainacan\API\EndPoints;

use \Tainacan\API\REST_Controller;
use Tainacan\Entities;
use Tainacan\Repositories;
use Tainacan\Entities\Entity;

class REST_Bulkedit_Controller extends REST_Controller {

	public function __construct() {
		$this->rest_base = 'bulk-edit';
        parent::__construct();
        add_action('init', array(&$this, 'init_objects'), 11);
    }
    
    public function init_objects() {
        $this->metadatum_repository = Repositories\Metadata::get_instance();
        $this->collections_repository = Repositories\Collections::get_instance();
	}


	/**
	 * 
	 *
	 * @throws \Exception
	 */
	public function register_routes() {
		register_rest_route($this->namespace, '/collection/(?P<collection_id>[\d]+)/' . $this->rest_base,
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array($this, 'create_item'),
					'permission_callback' => array($this, 'bulk_edit_permissions_check'),
					'args'                => $this->get_create_params()
				),
			)
        );
        register_rest_route($this->namespace, '/collection/(?P<collection_id>[\d]+)/' . $this->rest_base . '/(?P<group_id>[0-9a-f]+)/add',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array($this, 'add_value'),
					'permission_callback' => array($this, 'bulk_edit_permissions_check'),
					'args'                => [
                        'metadatum_id' => [
                            'type'        => 'integer',
                            'description' => __( 'The metadatum ID', 'tainacan' ),
                        ],
                        'value' => [
                            'type'        => 'string',
                            'description' => __( 'The value to be added', 'tainacan' ),
                        ],
                    ],
				),
			)
        );
        register_rest_route($this->namespace, '/collection/(?P<collection_id>[\d]+)/' . $this->rest_base . '/(?P<group_id>[0-9a-f]+)/set',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array($this, 'set_value'),
					'permission_callback' => array($this, 'bulk_edit_permissions_check'),
					'args'                => [
                        'metadatum_id' => [
                            'type'        => 'integer',
                            'description' => __( 'The metadatum ID', 'tainacan' ),
                        ],
                        'value' => [
                            'type'        => 'string',
                            'description' => __( 'The value to be added', 'tainacan' ),
                        ],
                    ],
				),
			)
        );
        register_rest_route($this->namespace, '/collection/(?P<collection_id>[\d]+)/' . $this->rest_base . '/(?P<group_id>[0-9a-f]+)/remove',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array($this, 'remove_value'),
					'permission_callback' => array($this, 'bulk_edit_permissions_check'),
					'args'                => [
                        'metadatum_id' => [
                            'type'        => 'integer',
                            'description' => __( 'The metadatum ID', 'tainacan' ),
                        ],
                        'value' => [
                            'type'        => 'string',
                            'description' => __( 'The value to be added', 'tainacan' ),
                        ],
                    ],
				),
			)
        );
        register_rest_route($this->namespace, '/collection/(?P<collection_id>[\d]+)/' . $this->rest_base . '/(?P<group_id>[0-9a-f]+)/replace',
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array($this, 'add_value'),
					'permission_callback' => array($this, 'bulk_edit_permissions_check'),
					'args'                => [
                        'metadatum_id' => [
                            'type'        => 'integer',
                            'description' => __( 'The metadatum ID', 'tainacan' ),
                        ],
                        'old_value' => [
                            'type'        => 'string',
                            'description' => __( 'The value to search for', 'tainacan' ),
                        ],
                        'new_value' => [
                            'type'        => 'string',
                            'description' => __( 'The value to be set', 'tainacan' ),
                        ],
                    ],
				),
			)
        );
		
    }
    

    public function bulk_edit_permissions_check($request) {
        $collection = $this->collections_repository->fetch($request['collection_id']);

		if ($collection instanceof Entities\Collection) {
            return current_user_can($collection->get_items_capabilities()->edit_others_posts);
        }

        return false;
    }


    public function create_item($request) {
        $body = json_decode($request->get_body(), true);

        $args = [];

        if (isset($body['items_ids']) && is_array($body['items_ids']) && !empty($body['items_ids'])) {
            $args['items_ids'] = $body['items_ids'];
        } elseif ( isset($body['use_query']) && $body['use_query'] ) {

            unset($request['paged']);
            unset($request['offset']);
            unset($request['perpage']);
            $request['nopaging'] = 1;
            
            $query_args = $this->prepare_filters($request);

            $collection_id = $request['collection_id'];

            $args = [
                'query' => $query_args,
                'collection_id' => $collection_id
            ];

        } else {
            return new \WP_REST_Response([
				'error_message' => __('You mus specify items_ids OR use_query', 'tainacan'),
			], 400);
        }

        $bulk = new \Tainacan\Bulk_Edit($args);

        $response = [
            'id' => $bulk->get_id()
        ];

        $rest_response = new \WP_REST_Response($response, 200);

		$rest_response->header('X-WP-Total', $bulk->count_posts());

        return $rest_response;

    }

    public function add_value($request) {
        
        return $this->generic_action('add_value', $request);

    }
    public function set_value($request) {
        
        return $this->generic_action('set_value', $request);

    }
    public function remove_value($request) {
        
        return $this->generic_action('remove_value', $request);

    }
    public function replace_value($request) {
        
        return $this->generic_action('replace_value', $request, ['old_value', 'new_value']);

    }


    private function generic_action($method, $request, $keys = ['value']) {
        $body = json_decode($request->get_body(), true);

		if(empty($body)){
			return new \WP_REST_Response([
				'error_message' => __('Body can not be empty.', 'tainacan'),
			], 400);
        }

        if(!isset($body['metadatum_id'])){
			return new \WP_REST_Response([
				'error_message' => __('You must specify a Metadatum ID.', 'tainacan'),
			], 400);
        }

        foreach ($keys as $key) {
            if(!isset($body[$key])){
                return new \WP_REST_Response([
                    'error_message' => sprintf(__('%s must be provided', 'tainacan'), $key),
                ], 400);
            }
        }
        
        $group_id = $request['group_id'];
        var_dump($group_id);

        $args = ['id' => $group_id];

        $bulk = new \Tainacan\Bulk_Edit($args);

        $metadatum = $this->metadatum_repository->fetch($body['metadatum_id']);

        if ( $metadatum instanceof Entities\Metadatum ) {

            $value = isset($body['new_value']) ? $body['new_value'] : $body['value'];
            $old_value = isset($body['old_value']) ? $body['old_value'] : null;
            
            $action = $bulk->$method($metadatum, $value, $old_value);

            if ( is_wp_error($action) ) {
                return new \WP_REST_Response([
                    'error_message' => $action->get_error_message(),
                ], 400);
            } else {
                return new \WP_REST_Response($action, 200);
            }


        } else {
            return new \WP_REST_Response([
				'error_message' => __('Metadatum not found.', 'tainacan'),
			], 400);
        }
    }



	/**
	 * @param null $object_name
	 *
	 * @return array|void
	 */
	public function get_create_params($object_name = null) {
		$query_params['context']['default'] = 'view';

		array_merge($query_params, parent::get_collection_params('item'));

		$query_params['title'] = array(
			'description' => __('Limits the result set to items with a specific title'),
			'type'        => 'string',
        );
        
        $query_params['items_ids'] = [
            'type'        => 'array',
            'items'       => [
                'type' => 'integer'
            ],
            'description' => __( 'Array of items IDs', 'tainacan' ),
        ];

        $query_params['use_query'] = [
            'type'        => 'bool',
            'description' => __( 'Whether to use the current query to select posts', 'tainacan' ),
        ];

		$query_params = array_merge($query_params, parent::get_meta_queries_params());

		return $query_params;
	}

}

?>