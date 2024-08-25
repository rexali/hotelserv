import { CronJob } from "cron";

export function automateTask(cronTime: string, callback: any) {
    // equivalent job using the "from" static method, providing parameters as an object
    const job = CronJob.from({
        cronTime: cronTime,
        onTick: function () {
            console.log('You will see this message every second');
            callback();
        },
        onComplete: null,
        start: false,
        timeZone: 'America/Los_Angeles'
    });

    return {job};
}
// job.start() is optional here because of the fourth parameter set to true.

// export const automateJobTask = new CronJob(
//     '*/5 * * * * *', // every 5 esconds
//     function () {
//         console.log("Every seconds: Do...");
//     },
//     null,
//     true,
//     "America/Los_Angeles"
// );

