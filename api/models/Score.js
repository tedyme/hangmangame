module.exports = {
	atrributes: {
      	id: {
      		primary: true,
      		type: 'number',
      		autoIncrement: true
      	},
      	wordGuessed: {
      		type: 'string'
      	},
   		gameWon: {
           type: 'boolean',
           required: true
        },
       	player: {
            model: 'user',
            required: true
        },
        guessesLeft: {
			type: 'number'        	
        }
	}
};
