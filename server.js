const dotenv=require('dotenv').config({path:'./config.env'})
const DbConnect=require('./db/dbConnect')

process.on('uncaughtException',(err)=>{
    console.log(err.message);
    console.log('Uncought Exception occured shuting down...');
    process.exit(1)
})
const app=require('./app');
const port=process.env.PORT || 8000;
const start=async()=>{
    try {
        await DbConnect(process.env.DB_STR, console.log('database connected'));
        
        const server=app.listen(port,()=>{
            console.log(`server is listning port ${port}`);
        })
    } catch (error) {
        console.log('Connection Error');
    }
}

start();

process.on('unhandledRejection',(err)=>{
    console.log(err.message);
    console.log('unhandeled rejection occured shuting down...');
    server.close(()=>{
        process.exit(1);
    })
})