import app from './app';
import config from './config';
import './database';

 function main (){
  app.listen(config.PORT,()=>{
      console.log('Server in port: ',config.PORT)
  })
}
main();



