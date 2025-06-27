import ToolA from '../pages/tools/ToolA';
import ToolB from '../pages/tools/ToolB';
import ToolC from '../pages/tools/ToolC';
import ToolF from '../pages/tools/ToolF';
import ToolH from '../pages/tools/ToolH';
import ToolE from '../pages/tools/ToolE';

export const toolMap = {
    'tool-a': { 
        name: 'RPM to Gb Calculator', 
        component: ToolA, 
        password: 'a123',
        roles: ['Architect'],},
    
    'tool-b': { 
        name: 'Sequencing Calculator', 
        component: ToolB, 
        password: 'b123',
        roles: ['FAS',],},
    
    'tool-c': { 
        name: 'Protocol Generator', 
        component: ToolC, 
        password: 'c123',
        roles: ['FAS'], },
    
    'tool-e': { 
        name: 'Primary Analysis Tutorial', 
        component: ToolE, 
        password: 'e123', 
        roles: ['Bioinformatics'], },
        
    'tool-f': { 
        name: 'Project Dashboard', 
        component: ToolF, 
        password: 'f123',
        roles: ['Project Management'],},
        
    'tool-h': { 
        name: 'Secondary Analysis Tutorial', 
        component: ToolH, 
        password: 'h123', 
        roles: ['Bioinformatics'], },
        
    'tool-i': { 
        name: 'Python Scripts', 
        component: null, 
        password: 'i123', 
        roles: ['Bioinformatics'],  },
};