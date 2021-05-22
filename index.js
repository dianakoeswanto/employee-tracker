const Prompt = require('./src/prompt');
const art = require('ascii-art');

const initialize = async () => {
        let rendered = await art.font("Employee Tracker", 'doom').completed();
        console.log(rendered);
        
        const prompt = new Prompt();
        prompt.start();    
}

initialize();