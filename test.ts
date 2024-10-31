
import { CronJob } from "cron";

const job = new CronJob(
            '* * * * * *',
            function () {
                console.log("Evry seconds");
                
            },
            null,
            true,
            "Nigeria/Lagos"
);

job.start();