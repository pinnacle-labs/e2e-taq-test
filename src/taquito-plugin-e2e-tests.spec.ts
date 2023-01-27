import { exec as exec1 } from 'child_process';
import utils from 'util';
const exec = utils.promisify(exec1);
import { prepareEnvironment } from '@gmrchk/cli-testing-library';

describe('Taquito Plugin E2E testing for Taqueria CLI', () => {
	jest.setTimeout(130000);




	test('deploy will deploy one contract using deploy {contractName} when there are multiple contracts in the artifacts - slowtest', async () => {
		const { execute, spawn, cleanup, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const config_file = await (await exec('cat src/test-data/config-taquito-test-environment.json')).stdout;
		await writeFile('./test-project/.taq/config.json', config_file);
		const { stdout: stdout1 } = await execute(
			'taq',

<<<<<<< HEAD
			'install @taqueria/plugin-taquito',
=======
			'install @taqueria/plugin-taquito@v0.27.17-rc',
>>>>>>> 3212583e4535041eb2cb820dd3c4767cec0a6670
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const storage_file = await (await exec('cat src/test-data/anyContract.storage.tz')).stdout;
		await writeFile('./test-project/artifacts/anyContract.storage.tz', storage_file);

		const hello_tz_file = await (await exec('cat src/test-data/hello-tacos.tz')).stdout;
		await writeFile('./test-project/artifacts/hello-tacos.tz', hello_tz_file);

		const increment_tz_file = await (await exec('cat src/test-data/increment.tz')).stdout;
		await writeFile('./test-project/artifacts/increment.tz', increment_tz_file);

		const { stdout: stdout2, stderr } = await execute(
			'taq',
			'deploy hello-tacos.tz --storage anyContract.storage.tz -e testing',
			'./test-project',
		);
		expect(stdout2).toEqual(expect.arrayContaining(
			['│ Contract       │ Address                              │ Alias       │ Balance In Mutez │ Destination                    │'],
		));

		await cleanup();
	});

	test('fund will error if funding maxed out accounts', async () => {
		const { execute, spawn, cleanup, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const test_config_file = await (await exec('cat src/test-data/config-taquito-test-environment.json')).stdout;
		await writeFile('./test-project/.taq/config.json', test_config_file);

		const { stdout: stdout1 } = await execute(
			'taq',
<<<<<<< HEAD
			'install @taqueria/plugin-taquito',
=======
			'install @taqueria/plugin-taquito@v0.27.17-rc',
>>>>>>> 3212583e4535041eb2cb820dd3c4767cec0a6670
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const { stdout: stdout3, stderr } = await execute('taq', 'fund -e testing', './test-project');
		if (stderr.length > 0) console.error(stderr);
		expect(stdout3).toContain(
			'All instantiated accounts in the current environment, "testing", are funded up to or beyond the declared amount',
		);

		await cleanup();
	});

	test('fund will error if calling fund in a non-network environment', async () => {
		const { execute, spawn, cleanup } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const { stdout: stdout1 } = await execute(
			'taq',
<<<<<<< HEAD
			'install @taqueria/plugin-taquito',
=======
			'install @taqueria/plugin-taquito@v0.27.17-rc',
>>>>>>> 3212583e4535041eb2cb820dd3c4767cec0a6670
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const { stderr } = await execute('taq', 'fund', './test-project');
		expect(stderr).toContain('taq fund can only be executed in a network environment');

		await cleanup();
	});

	test('instantiate-account can only once instantiate an account on a network', async () => {
		const { execute, spawn, cleanup, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");
		const test_config_file = await (await exec('cat src/test-data/config-taquito-test-environment.json')).stdout;
		await writeFile('./test-project/.taq/config.json', test_config_file);

		const { stdout: stdout1 } = await execute(
			'taq',
<<<<<<< HEAD
			'install @taqueria/plugin-taquito',
=======
			'install @taqueria/plugin-taquito@v0.27.17-rc',
>>>>>>> 3212583e4535041eb2cb820dd3c4767cec0a6670
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const { stdout: stdout2 } = await execute('taq', 'instantiate-account -e testing', './test-project');
		expect(stdout2).toContain('Please execute "taq fund" targeting the same environment to fund these accounts');

		const { stdout: stdout3, stderr } = await execute('taq', 'instantiate-account -e testing', './test-project');
		expect(stdout3).toContain(
			'No accounts were instantiated because they were all instantiated in the target environment already',
		);
		expect(stderr).toContain('Note: bob is already instantiated in the current environment, "testing"');

		await cleanup();
	});

	test('deploy will error if a named environment does not exist', async () => {
		const { execute, spawn, cleanup, writeFile } = await prepareEnvironment();
		const { waitForText } = await spawn('taq', 'init test-project');
		await waitForText("Project taq'ified!");

		const { stdout: stdout1 } = await execute(
			'taq',
<<<<<<< HEAD
			'install @taqueria/plugin-taquito',
=======
			'install @taqueria/plugin-taquito@v0.27.17-rc',
>>>>>>> 3212583e4535041eb2cb820dd3c4767cec0a6670
			'./test-project',
		);
		expect(stdout1).toEqual(expect.arrayContaining(['Plugin installed successfully']));

		const tz_file = await (await exec('cat src/test-data/hello-tacos.tz')).stdout;
		await writeFile('./.taq/artifacts/hello-tacos.tz', tz_file);

		const { stderr } = await execute(
			'taq',
			'deploy hello-tacos.tz --storage anyContract.storage.tz -e no_such_env',
			'./test-project',
		);
		expect(stderr).toContain('There is no environment called no_such_env in your config.json');

		await cleanup();
	});
});
