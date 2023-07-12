import schedule from "node-schedule";

const jobToRun = () => {
    console.log('This job runs every 3 seconds.');
};

schedule.scheduleJob('*/3 * * * * *', jobToRun);
