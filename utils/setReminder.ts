import schedule, { JobCallback } from "node-schedule";
// import CronParser from "date2cron";

export function setReminderTask(date: any, reminderCallback: JobCallback) {
    // const cronTime = new CronParser(date).convert();
    // schedule.scheduleJob('0 ' + cronTime, reminderCallback);
    const dateFromDb = new Date(date)
    const seconds = dateFromDb.getSeconds();
    const minutes = dateFromDb.getMinutes();
    const hours = dateFromDb.getHours();
    const dates = dateFromDb.getDate();
    const months = dateFromDb.getMonth() + 1; // one added due to GMT
    const day = dateFromDb.getDay();
    const cronTime = seconds + ' ' + minutes + ' ' + hours + ' ' + dates + ' ' + months + ' ' + day;

    schedule.scheduleJob(cronTime, reminderCallback);
}


