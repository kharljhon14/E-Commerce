module.exports = {
     getError(errors, propertyName){
        try {
           //errors is an array
           //mapped is to return the array as an object
           return errors.mapped()[propertyName].msg;
        } catch (err) {
           return "";
        }
     },
}