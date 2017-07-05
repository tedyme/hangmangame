/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

        username: {
                  type: 'string',
                  required: true
              },
       password: {
           type: 'string'
       },
       wins: {
           type: 'integer'
       }
  }
};
GET /score?where=user.id=x
if(gameWon == true){
   this.wins++
}
