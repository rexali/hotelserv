// import { Request, Response } from "express";
// import { Op } from "sequelize";
// import { Driver } from "../../models/drivers";
// import { Enumerator } from "../../models/enumerator.model";
// import { sequelize } from "../../config/config";

// export async function getNewRegisteredWorkersThisWeek(req: Request, res: Response) {

//     try {
//         const today = new Date();
//         const lastWeek = today.setDate(today.getDate() - 7);
//         const totalEnumerators = await Enumerator.count({
//             where: {
//                 createdAt: {
//                     [Op.gte]: lastWeek
//                 }
//             }
//         })

//         const totalDrivers = await Driver.count({
//             where: {
//                 createdAt: {
//                     [Op.gte]: lastWeek
//                 }
//             }
//         })

//         const totaltransportWorkers = totalDrivers + totalEnumerators;

//         return totaltransportWorkers;

//     } catch (error) {

//         console.log(error)
//     }
// }


// export async function getNewRegisteredUsersPerDayOftheMonth(req: Request, res: Response) {
//     try {
//         const driverUsersByDay = await Driver.findAll({
//             attributes: [
//                 [sequelize.fn('DATE_TRUNC', 'day', sequelize.col('createdAt')), 'day'],
//                 [sequelize.fn('COUNT', sequelize.col('driverId')), 'numberOfUsers']
//             ],
//             where: {
//                 createdAt: {
//                     [Op.gte]: sequelize.literal('DATE_TRUNC(\'month\', CURRENT_DATE)'),
//                     [Op.lte]: sequelize.literal('DATE_TRUNC(\'month\', CURRENT_DATE) + INTERVAL \'1 month\'')
//                 }
//             },
//             group: ['day']
//         });

//         const enumeratorUsersByDay = await Enumerator.findAll({
//             attributes: [
//                 [sequelize.fn('DATE_TRUNC', 'day', sequelize.col('createdAt')), 'day'],
//                 [sequelize.fn('COUNT', sequelize.col('enumeratorId')), 'numberOfUsers']
//             ],
//             where: {
//                 createdAt: {
//                     [Op.gte]: sequelize.literal('DATE_TRUNC(\'month\', CURRENT_DATE)'),
//                     [Op.lte]: sequelize.literal('DATE_TRUNC(\'month\', CURRENT_DATE) + INTERVAL \'1 month\'')
//                 }
//             },
//             group: ['day']
//         });

//         const driverUsersByDayOfMonth = {} as any;
//         const enumeratorUsersByDayOfMonth = {} as any;

//         driverUsersByDay.forEach((user) => {
//             const dayOfMonth = new Date(user.day).getDate() as any;
//             driverUsersByDayOfMonth[dayOfMonth] = user.numberOfUsers
//         });

//         enumeratorUsersByDay.forEach((user) => {
//             const dayOfMonth = new Date(user.day).getDate() as any;
//             enumeratorUsersByDayOfMonth[dayOfMonth] = user.numberOfUsers
//         });

//         return { usersByDay: { driverUsersByDayOfMonth, enumeratorUsersByDayOfMonth } }

//     } catch (error) {

//         console.log(error);

//     }
// }



// export async function getTotalTransportWorkers(req: Request, res: Response) {

//     try {

//         const totalEnumerators = await Enumerator.count();

//         const totalDrivers = await Driver.count();

//         const totalRiders = await Driver.findAndCountAll({
//             where: {
//                 vehicleCategory: {
//                     [Op.or]: ["Taxis", "Motorcycles (Okadas)"]
//                 }
//             }
//         });
//         const noOfRiders = totalRiders.count;
//         const totalTransportWorkers = totalDrivers + totalEnumerators;
//         return {
//             totalTransportWorkers,
//             totalDrivers,
//             totalEnumerators,
//             noOfRiders
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }


// async function getTotalTaxesPaidThisWeek(req: Request, res: Response) {
//     try {
//         const today = new Date();
//         const lastWeek = today.setDate(today.getDate() - 7);
//         const totalTaxesForThisWeek = await Transaction.sum("amount", {
//             where: {
//                 createdAt: {
//                     [Op.gte]: lastWeek
//                 }
//             },
//         });
//         return {totalTaxesForThisWeek}
//     } catch (error) {
//        console.log(error);
//     }
// }


// async function getTotalTaxesPerDayOfTheWeek(req: Request, res: Response) {
//     const today = new Date();
//     const lastWeek = today.setDate(today.getDate() - 7);
//     const taxesByDayofTheWeek: any = {
//         Monday: 0,
//         Tueday: 0,
//         Wednesday: 0,
//         Thursday: 0,
//         Friday: 0,
//         Saturday: 0,
//         Sunday: 0
//     }
//     try {
//         const taxesByDay = await Tax.findAll({
//             attributes: [
//                 "Tax.taxId",
//                 [sequelize.fn("DATE_TRUNC", 'day', sequelize.col('transactions.createdAt')), 'day'],
//                 [sequelize.fn("SUM", sequelize.col('transactions.amount')), 'totalTaxesForThisWeek'],
//             ],
//             include: [
//                 {
//                     model: Transaction,
//                     as: "transactions",
//                     attributes: [],
//                 }
//             ],
//             where: {
//                 createdAt: {
//                     [Op.gte]: lastWeek
//                 }
//             },
//             group: ['Tax.taxId', 'day']
//         });
//         taxesByDay.forEach((tax) => {
//             const dayOfWeek = new Date(tax.day).toLocaleString('en-Us', { weekday: 'long' }) as any;
//             taxesByDayofTheWeek[dayOfWeek] = tax.totalTaxesForThisWeek;
//         });
//         return {taxesByDayofTheWeek}
//     } catch (error) {
//         console.log(error);        
//     }
// }