import React from 'react';
import ReactDOM from 'react-dom'


export default class ProjectProfilePage extends React.Component {
	constructor() {
		super();
		this.stripe = Stripe('pk_test_DN1CFjitql3IOBgUNqgeANjd');
	}

	componentDidMount() {
		
		var elements = this.stripe.elements();
		// $('.control-group li:first-child').remove();
		$('#main').css({'margin-bottom': '0', 'height': 'auto'});

		var stripeFields = (<div className='control-group'>
				<label for='card-number'>Card number</label>
				<p className="help note">Your credit card will not be billed until after you've had a chance to select a plan.</p>
				<div id='card-number'></div>
				<label for='card-expiry'>Card expiry</label>
				<div id='card-expiry'></div>
				<label for='card-cvc'>Card cvc</label>
				<div id='card-cvc'></div>
				<label for='postal-code'>Postal code</label>
				<div id='postal-code'></div>
			</div>);
		ReactDOM.render(
			stripeFields,
			document.getElementById('stripe-fields')
		);

		var style = {
			base: {
				'fontFamily': 'europa,Arial,Helvetica,sans-serif',
				'color': '#666'
			}
		};


		this.cardNumber = elements.create('cardNumber', {style: style});
		this.cardExpiry = elements.create('cardExpiry', {style: style});
		this.cardCvc = elements.create('cardCvc', {style: style});
		this.postalCode = elements.create('postalCode', {style: style});
		this.cardNumber.mount('#card-number');
		this.cardExpiry.mount('#card-expiry');
		this.cardCvc.mount('#card-cvc');
		this.postalCode.mount('#postal-code');
	}

	submitHandler() {
		// $('#ProjectProfile').submit();

		this.stripe.createToken(this.cardNumber).then(function(result) {
			if (result.error) {
				console.info(result.error);
				// Inform the user if there was an error
				// var errorElement = document.getElementById('card-errors');
				// errorElement.textContent = result.error.message;
			} else {
				$('#id_source_token').val(result.token.id);
				$('#ProjectProfile').submit();
			}
		});
	}

	render() {
		var formHTML = document.getElementById('project-profile-form').innerHTML;
		var form = { '__html': formHTML } ;


    	
		return (

			<div className='ink-grid full-height'>
				<div className='column-group gutters'>
					<div className="all-90 push-center vertical-space align-center">
						<h1>Fill out this short form to help us better understand your project. </h1>
					</div>
				</div>
				<div className='column-group gutters full-height'>
					<div className="all-40 tiny-90 small-90 medium-55 push-center block projectProfile" dangerouslySetInnerHTML={form}></div>
				</div>
				<div className='column-group gutters'>
					<div className="all-50 tiny-90 small-90 medium-55 push-center align-right">
						<input className="ink-button" type="submit" value="Submit" onClick={this.submitHandler.bind(this)}/>
					</div>
				</div>
			</div>
		);
	}
}