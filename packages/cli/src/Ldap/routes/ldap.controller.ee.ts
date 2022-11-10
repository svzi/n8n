import express from 'express';
import { LdapManager } from '../LdapManager.ee';
import { getLdapConfig, getLdapSyncronizations, updateLdapConfig } from '../helpers';
import type { LdapConfig } from '../types';

export const ldapController = express.Router();

/**
 * GET /ldap/config
 */
ldapController.get('/config', async (req: express.Request, res: express.Response) => {
	const { data } = await getLdapConfig();
	return res.status(200).json({ data });
});
/**
 * POST /ldap/test-connection
 */
ldapController.post('/test-connection', async (req: express.Request, res: express.Response) => {
	try {
		await LdapManager.getInstance().service.testConnection();
	} catch (error) {
		const errorObject = error as { message: string };
		return res.status(400).json({ message: errorObject.message });
	}
	return res.status(200).json();
});

/**
 * PUT /ldap/config
 */
ldapController.put('/config', async (req: LdapConfig.Update, res: express.Response) => {
	try {
		await updateLdapConfig(req.body);
	} catch (e) {
		if (e instanceof Error) {
			return res.status(400).json({ message: e.message });
		}
	}

	const { data } = await getLdapConfig();

	LdapManager.updateConfig(data);

	return res.status(200).json({ data });
});

/**
 * POST /ldap/sync
 */
ldapController.post('/sync', async (req: LdapConfig.Sync, res: express.Response) => {
	const runType = req.body.type;

	try {
		await LdapManager.getInstance().sync.run(runType);
	} catch (e) {
		if (e instanceof Error) {
			return res.status(400).json({ message: e.message });
		}
	}
	return res.status(200).json({});
});

/**
 * GET /ldap/sync
 */
ldapController.get('/sync', async (req: LdapConfig.GetSync, res: express.Response) => {
	const { page = '0', perPage = '20' } = req.query;
	const data = await getLdapSyncronizations(parseInt(page, 10), parseInt(perPage, 10));
	return res.status(200).json({ data });
});
