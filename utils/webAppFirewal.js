var expressWaf =  require("express-waf");

const emudb = expressWaf.EmulatedDB();
export const waf = new expressWaf.MongoDB.ExpressWaf({
    blocker:{
        db:emudb,
        blockTime:1000
    },
    log:true
});
waf.addModule('',{
    allowedMethods:['GET','POST'],
})