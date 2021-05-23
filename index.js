const Prompt = require('./src/prompt');
const art = require('ascii-art');

const initialize = async () => {
        let rendered = await art.font("Employee Tracker", 'doom').completed();
        console.log(rendered);
        
        const prompt = new Prompt();
        try {
                prompt.start();    
        } catch (err) {
                console.log(`An error has occured. Please ensure that there are no other 
                        entities associated to the entity you are trying to remove`);
        }
}

initialize();