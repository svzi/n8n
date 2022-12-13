import { AllEntities, Entity } from 'n8n-workflow';

type GoogleBigQueryMap = {
	record: 'create' | 'getAll';
};

export type GoogleBigQuery = AllEntities<GoogleBigQueryMap>;

export type GoogleBigQueryRecord = Entity<GoogleBigQueryMap, 'record'>;