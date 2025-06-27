import FormA from '../pages/forms/FormA';
import FormB from '../pages/forms/FormB';

export const formMap = {
    'form-a': {
        name: 'Scanner Issues Report',
        component: FormA,
        password: 'formA123',
        roles: ['FAS'],
    },
    'form-b': {
        name: 'NPS Training Feedback',
        component: FormB,
        password: 'formB123',
        roles: ['FAS'],
    },
    // Add more forms as needed 
}