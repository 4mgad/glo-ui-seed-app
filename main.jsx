import React from 'react';
import ReactDOM from 'react-dom';
import g, {AbstractApp, SmallButton} from 'glo-ui';

import "./main.scss";

class HelloWorldApp extends AbstractApp {
	renderApp() {
		return (
			<div className="hello-world container">
				<h1>Hello World Glo UI App!</h1>
				<div>
					<SmallButton
						title="Show Message"
						onClick={
							() => {
								g.showMessage({
									title: "Hi There!",
									content: "Hello World!"
								});
							}
						}
					/>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<HelloWorldApp/>, document.getElementById('root'));
