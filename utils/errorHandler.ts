export function errorHandler(err: any,req: any,res: any,next: any) {
   console.log(err);
   res.status(500).json({status:"fail",data:null,message:"Error: "+err})
}