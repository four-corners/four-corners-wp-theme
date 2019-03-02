import React from 'react';
import { render } from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
// import SchemaForm from 'react-jsonschema-form';

import i18n from '../i18n.jsx';
import Header from '../header.jsx';

class Contact extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			lang: 'en',
			page: {},
		};
		this.onLanguageChanged = this.onLanguageChanged.bind(this);
	}

	componentDidMount() {
		let self = this;
		let lang = i18n.language;
		let req = SiteSettings.url.api+'page?slug=contact&lang='+lang;
		fetch(req)
			.then(function(res) {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				return res.json();
			})
			.then(function(res) {
				if(res) {
					self.setState({ page: res });
				}
			});
		i18n.on('languageChanged', this.onLanguageChanged);
	}

	componentWillUnmount() {
		i18n.off('languageChanged', this.onLanguageChanged);
	}

	componentDidUpdate() {

	}

	onLanguageChanged(lang) {
		this.setState({
			lang: lang
		});
	}

	render() {
		let lang = this.state.lang;
		const page = this.state.page;
		
		return (
			<main id="contact">
				<div className="max-width">
					<h1>{ReactHtmlParser(page.post_title)}</h1>

				</div>
			</main>
		);
	}
}

export default Contact;