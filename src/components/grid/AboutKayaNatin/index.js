import { Component } from 'preact';
import { route } from 'preact-router';
import { updateStore } from '_unistore';
import style from './style.scss';

// eslint-disable-next-line react/prefer-stateless-function
class AboutKayaNatin extends Component {
	componentDidMount = () => {
		updateStore({
			customBack: () => {
				route('/', true)
			}
		});
	};

	render = () => {
	  return (
	    <div className={style.termsContent}>
	      <p>
          Kaya Natin is a non-profit and non-government organization that promotes good governance and ethical leadership in the Philippines.
        </p>
        <p>
          Since 2008, our organization creates opportunities for good governance to flourish through undertaking programs that a&#41; hone ethical, effective, and empowering leadership, and b&#41; engage citizens to take action towards unity and progress in our country.
        </p>
        <p>
          Vice President Leni Robredo and Sen. Kiko Pangilinan have been our Kaya Natin! Champions who embody KN's three E's brand of Leadership.
        </p>
        <p>
          We stand alongside VP Leni and Sen. Kiko in this year's historical elections. To further help their campaign efforts, together with other volunteer groups, we developed the Leni 2022 App.
        </p>
	    </div>
	  );
	};
}
export default AboutKayaNatin;
