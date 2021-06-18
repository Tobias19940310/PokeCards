import ReactDOM from 'react-dom';
import App from '../App';
import renderer from 'react-test-renderer';
import TestRenderer  from 'react-test-renderer';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
});

it('default Render Snapshot', () => {
    const tree = renderer
        .create(<App />)
        .toJSON();
    expect(tree).toMatchSnapshot();
    });