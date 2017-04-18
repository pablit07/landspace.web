import React from 'react';
import ReactDOM from 'react-dom'


export default class ProjectProfilePage extends React.Component {
	constructor() {
		super();
		this.stripe = Stripe(document.getElementById('stripe-public-data').innerHTML);
	}

	componentDidMount() {
		
		var elements = this.stripe.elements();
		// $('.control-group li:first-child').remove();
		$('#main').css({'margin-bottom': '0', 'height': 'auto'});

		var stripeFields = (<div className='control-group vertical-space'>
				<div className="alert alert-danger"><strong id='card-errors'></strong></div>
				<label for='card-number'>Card number</label>
				<p className="help note">Your credit card will not be billed until after you've had a chance to select a plan.</p>
				<div id='card-number'></div>
				<label for='card-expiry'>Card expiry</label>
				<div id='card-expiry'></div>
				<label for='card-cvc'>Card cvc</label>
				<div id='card-cvc'></div>
				<label for='postal-code'>Card zip code</label>
				<p className="help note">**Billing zip; may differ from above</p>
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

		$('#id_address_1, #id_address_2, #id_city, #id_state_province, #id_zip_code, #id_country').each((i, el) => {
			var label = $(el).siblings('label');
			$(el).closest('.control-group').remove();
			$('#address-fields').append($('<div/>').append(label).append(el));
			$('#address-fields').append($('<br/>'));
		});

		var current = 1;
		
		var widget      = $("form .control-group");
		var btnnext     = $(".next");
		var btnback     = $(".back"); 
		var btnsubmit   = $("#submit");

		btnsubmit.hide();


		var setProgress = function(currstep){
			var percent = parseFloat(100 / widget.length) * currstep;
			percent = percent.toFixed();
			$(".progress-bar").css("width",percent+"%").html(percent+"%");		
		};

		var hideButtons = function(current){
			var limit = parseInt(widget.length); 
			$(".action").hide();
			if(current < limit) btnnext.show();
			if(current > 1) btnback.show();
			if (current == limit) { 
				// Show entered values
				$(".display label.lbl").each(function(){
					$(this).html($("#"+$(this).data("id")).val());	
				});
				btnnext.hide(); 
				btnsubmit.show();
			}
		};

		// INIT BUTTONS AND UI
		widget.not(':eq(0)').hide();
		hideButtons(current);
		setProgress(current);
		// NEXT BUTTON CLICK ACTION
		btnnext.click(function(){
			if(current < widget.length){
				// CHECK VALIDATION
				// if($(".form").valid()){
					widget.show();
					widget.not(':eq('+(current++)+')').hide();
					setProgress(current);
				// }
			}
			hideButtons(current);
		})
		// SUBMIT BUTTON CLICK
		//btnsubmit.click(function(){
		//	alert("Submit button clicked");
		//});
		// BACK BUTTON CLICK ACTION
		btnback.click(function(){
			if(current > 1){
				current = current - 2;
				if(current < widget.length){
					widget.show();
					widget.not(':eq('+(current++)+')').hide();
					setProgress(current);
				}
			}
			hideButtons(current);
		});
	}

	submitHandler() {

		this.stripe.createToken(this.cardNumber).then(function(result) {
			if (result.error) {
				console.error(result.error);
				// Inform the user if there was an error
				var errorElement = document.getElementById('card-errors');
				errorElement.textContent = result.error.message;
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
				<div className='column-group gutters'>
					<div className="all-40 tiny-90 small-90 medium-55 push-center block projectProfile" dangerouslySetInnerHTML={form}></div>
				</div>
				<div className='column-group gutters'>
					<div className="all-40 tiny-90 small-90 medium-55 push-center">
						<div className='all-50'>
					      <button type="button" className="action back ink-button"><i className="fa fa-angle-double-left"></i>&nbsp; Back</button>
					    </div>

					    <div className="all-50">

							<button type="button" className="action next ink-button">Next &nbsp;<i className="fa fa-angle-double-right"></i></button>
			      	  		<input id="submit" className="ink-button" type="submit" value="Submit" onClick={this.submitHandler.bind(this)}/>
				      </div>
						
					</div>
				</div>
			</div>
		);
	}
}