import { INodeProperties } from 'n8n-workflow';

export const schemaOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['schema'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
			},
		],
		default: 'create',
	},
];

export const schemaFields: INodeProperties[] = [
	{
		displayName: 'Type',
		name: 'schemaType',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['schema'],
			},
		},
		options: [
			{
				name: 'Custom Object',
				value: 'typeCustomObject',
			},
			{
				name: 'Association',
				value: 'typeAssociation',
			},
		],
		default: 'typeCustomObject',
	},

	/* -------------------------------------------------------------------------- */
	/*               schema:Custom Object                                         */
	/* -------------------------------------------------------------------------- */

	//  customObject:create -------------------------------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		description: 'A unique name for this object. For internal use only.',
		displayOptions: {
			show: {
				resource: ['schema'],
				operation: ['create'],
				schemaType: ['typeCustomObject'],
			},
		},
	},
	{
		displayName: 'Primary Display Property',
		name: 'primaryDisplayProperty',
		type: 'string',
		default: '',
		hint: 'Property with such name must be defined in properties',
		required: true,
		displayOptions: {
			show: {
				resource: ['schema'],
				operation: ['create'],
				schemaType: ['typeCustomObject'],
			},
		},
	},
	{
		displayName: 'Labels',
		name: 'objectLabels',
		default: {},
		type: 'fixedCollection',
		placeholder: 'Add Labels',
		required: true,
		typeOptions: {
			multipleValues: false,

		},
		options: [
			{
				displayName: 'Labels',
				name: 'labels',
				values: [
					{
						displayName: 'Singular',
						name: 'singular',
						type: 'string',
						default: '',
						required: true,
					},
					{
						displayName: 'Plural',
						name: 'plural',
						type: 'string',
						default: '',
						required: true,
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['schema'],
				operation: ['create'],
				schemaType: ['typeCustomObject'],
			},
		},
	},
	{
		displayName: 'Properties',
		name: 'properties',
		default: [],
		type: 'fixedCollection',
		required: true,
		placeholder: 'Add Property',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				displayName: 'Properties',
				name: 'values',
				values: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						required: true,
						description: 'The internal property name, which must be used when referencing the property from the API',
					},
					{
						displayName: 'Label',
						name: 'label',
						type: 'string',
						default: '',
						required: true,
						description: 'A human-readable property label that will be shown in HubSpot',
					},
					{
						displayName: 'Options',
						name: 'options',
						type: 'collection',
						placeholder: 'Add Option',
						default: {},
						options: [
							{
								displayName: 'Description',
								name: 'description',
								type: 'string',
								default: '',
								description: 'A description of the property that will be shown as help text in HubSpot',
							},
							{
								displayName: 'Display Order',
								name: 'displayOrder',
								type: 'number',
								default: 0,
								description: 'The order that this property should be displayed in the HubSpot UI',
							},
							{
								displayName: 'Group Name',
								name: 'groupName',
								type: 'string',
								default: '',
								description: 'The name of the group this property belongs to',
							},
							{
								displayName: 'Has Unique Value',
								name: 'hasUniqueValue',
								type: 'boolean',
								default: false,
								description: 'Whether or not the property\'s value must be unique',
							},
							{
								displayName: 'Hidden',
								name: 'hidden',
								type: 'boolean',
								default: false,
								description: 'Whether or not the property is hidden',
							},
							{
								displayName: 'Type',
								name: 'type',
								type: 'options',
								default: 'string',
								description: 'The data type of the property',
								options: [
									{
										name: 'Boolean',
										value: 'bool',
									},
									{
										name: 'Date',
										value: 'date',
									},
									{
										name: 'Datetime',
										value: 'datetime',
									},
									{
										name: 'Enumeration',
										value: 'enumeration',
									},
									{
										name: 'Number',
										value: 'number',
									},
									{
										name: 'String',
										value: 'string',
									},
								],
							},
						],
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['schema'],
				operation: ['create'],
				schemaType: ['typeCustomObject'],
			},
		},
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['schema'],
				operation: ['create'],
				schemaType: ['typeCustomObject'],
			},
		},
		options: [
			{
				displayName: 'Associated Objects',
				name: 'associatedObjects',
				type: 'string',
				default: '',
				description: 'Associations defined for this object type',
				hint: 'Comma separeted values',
			},
			{
				displayName: 'Required Properties',
				name: 'requiredProperties',
				type: 'string',
				default: '',
				description: 'The names of properties that should be required when creating an object of this type',
				hint: 'Comma separeted values',
			},
			{
				displayName: 'Searchable Properties',
				name: 'searchableProperties',
				type: 'string',
				default: '',
				description: 'TNames of properties that will be indexed for this object type in by HubSpot\'s product search',
				hint: 'Comma separeted values',
			},
			{
				displayName: 'Secondary Display Properties',
				name: 'secondaryDisplayProperties',
				type: 'string',
				default: '',
				description: 'The names of secondary properties for this object. These will be displayed as secondary on the HubSpot record page for this object type.',
				hint: 'Comma separeted values',
			},
		],
	},


	/* -------------------------------------------------------------------------- */
	/*               schema:Association                                           */
	/* -------------------------------------------------------------------------- */

	//  Association:create ---------------------------------------------------------
	{
		displayName: 'Object Type Name or ID',
		name: 'objectType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['schema'],
				operation: ['create'],
				schemaType: ['typeAssociation'],
			},
		},
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getCustomObjectTypes',
		},
		default: '',
	},
	{
		displayName: 'To Object Type Name or ID',
		name: 'toObjectType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['schema'],
				operation: ['create'],
				schemaType: ['typeAssociation'],
			},
		},
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getCustomObjectTypes',
		},
		default: '',
		description: 'The type of the target object. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/nodes/expressions.html#expressions">expression</a>.',
	},
	{
		displayName: 'Association Name',
		name: 'associationName',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['schema'],
				operation: ['create'],
				schemaType: ['typeAssociation'],
			},
		},
	},
];
