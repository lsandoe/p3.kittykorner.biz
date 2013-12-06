
	
	
	
	




	
/*-------------------------------------------------------------------------------------------------
Stickers
Note here we use the .on() method instead of just .click()
This is because we want this listener to also apply to the Google Image Stickers which are
added *after* the page loads. In order to do this, on has to be used, and we have to delegate the
listening for .stickers to the #controls div.
-------------------------------------------------------------------------------------------------*/	
$('#controls').on('click', '.stickers', function() {

	// Clone the sticker that was clicked
	var new_sticker = $(this).clone();
	
	// A class so we can position stickers on the
	new_sticker.addClass('stickers_on_card');
	
	// Inject the new image into the canvas
	$('#canvas').prepend(new_sticker);
	
	// Make that puppy draggable
	new_sticker.draggable({containment: '#canvas', opacity:.35});
		
});



	
	
/*-------------------------------------------------------------------------------------------------
Start over
-------------------------------------------------------------------------------------------------*/
$('#refresh-btn').click(function() {
	
	// Reset color and texture
	//$('#canvas').css('background-color', 'white');
	//$('#canvas').css('background-image', '');
	
	// Clear message and recipient divs
	//$('#message-output').html("");
	//$('#recipient-output').html("");
		
	// Remove any stickers
	$('.stickers_on_card').remove();

});


/*-------------------------------------------------------------------------------------------------
Print
-------------------------------------------------------------------------------------------------*/
$('#print-btn').click(function() {
	
	
	//test out to add potato template
	$('#canvas').prepend("<img class='stickers_on_card' id='potatotemplate' src='images/potatotemplate.png' alt='potato template'>");
	
	// Goal: Open the card in a new tab
   
    // Take the existing card on the page (in the #canvas div) and clone it for the new tab
    var canvas_clone = $('#canvas').clone();
        
    /* 
    Next, we need to get the HTML code of the card element
    We can't just say canvas.html() because that will get us the stuff *inside* the #canvas:
    
    	<div id="message-output"></div>
		<div id="recipient-output"></div>
		
	Think of a turkey sandwich. The above gets us just the inside of the sandwich, the turkey... But we need the bread too.
		
    I.e., this is what we want:
    
   		<div id="canvas" style="background-image: url(images/texture-cloth.png);">
			<div id="message-output"></div>
			<div id="recipient-output"></div>
		</div> 
    
    To accomplish this we'll use a new method .prop (short for property) and request the "outerHTML" property of the canvas.
    In JavaScript land, "outerHTML" is both the bread and the meat of an element. 
    (Don't let it confuse you, the name outerHTML sounds kinda like it would just be the bread...it's not...it's the whole sammie).
    */
    var canvas = canvas_clone.prop('outerHTML'); // Give us the whole canvas, i.e the bread and the meat, i.e the complete card from our clone
    	    
    // Now that we have the entire canvas let's focus on creating our new tab
    
    // For the new tab, we need to basically construct all the pieces we need for any HTML page starting with a start <html> tag.
    var new_tab_contents  = '<html>';
    
    // (Note the += symbol is used to add content onto an existing variable, so basically we're just adding onto our new_tab_contents variable one line at a time)
    new_tab_contents += '<head>';
    new_tab_contents += '<link rel="stylesheet" href="css/main.css" type="text/css">'; // Don't forget your CSS so the card looks good in the new tab!
    new_tab_contents += '<link rel="stylesheet" href="css/features.css" type="text/css">';
	new_tab_contents += '<style> body {margin-left: 65px; margin-top: 60px;} #hh {margin-left: 50px;} #made {margin-left: 40px;}</style>';
    new_tab_contents += '</head>';
    new_tab_contents += '<body>'; //this works but is inline style="margin-left: 65px; margin-top: 100px;"
	new_tab_contents += '<img id="hh" src="images/happyholidays.png" alt="Happy Holidays"/>';
    new_tab_contents += canvas; // Here's where we add the card to our HTML for the new tab
	new_tab_contents += '<img id="made" src="images/made.png" alt="made especially for you by hand"/>';
    new_tab_contents += '</body></html>';
    
	// Ok, our card is ready to go, we just need to work on opening the tab
    
    // Here's how we tell JavaScript to create a new tab (tabs are controlled by the "window" object).
    var new_tab =  window.open();

	// Now within that tab, we want to open access to the document so we can make changes
    new_tab.document.open();
    
    // Here's the change we'll make: we'll write our card (i.e., new_tab_contents) to the document of the tab
    new_tab.document.write(new_tab_contents);
    
    // Then close the tab. This isn't actually closing the tab, it's just closing JS's ability to talk to it.
    // It's kind of like when you're talking to a walkie-talkie and you say "over and out" to communicate you're done talking
    new_tab.document.close();
    		
});


