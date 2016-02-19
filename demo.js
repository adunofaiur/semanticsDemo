/*
	Before the page loads, we create a bsService object. Do not change the name - that will break stuff :(
		The arguments passed in are a list of strings. Each string is an extensionID. these particular ID's are
		for the released version of the IdeaMACHE plugin and for a secret, special version of the extension 
		that I have
	bsService will see if any of the extenions are availabe. If so it will use them. Otherwise, it will rely on the
		web-hosted version of bigsemantics

	 */

var bsService = new BSAutoSwitch(['elkanacmmmdgbnhdjopfdeafchmhecbf', 'gdgmmfgjalcpnakohgcfflgccamjoipd ']);
//This is a flag that disables some mumbo-jump in RendererBase. Use false if you paln on using a cusotm renderer
idealRenderer = false;
function onLoad(){


	/*
	Let's break down the arguments.
		-container: whatever HTML node you want to dump the rendering into
		-url: the URL you want a metadataRendering of.
		-null: if you already have metadata, you can pass it in as a clipping here. You don't really need to worry about this
				unless you're doing something quite complicated.
		-MICE.render: the prefered rendering function. IE: it's what will be called after BigSemantics finishes extracting
					  metadata and mmd. You can supply your own for fun and profit!
		-options: you can set some additional parameters here. The big one is options.callback, 
					which you can use if for some reason you need access to the metadata and meta-metadata

					If what you really want is access to that sweet MetadataViewModel, see the "Custom Rendering" demo
	*/
	var container = document.getElementById('containerPrime');
	var url = "http://www.amazon.com/gp/product/B00MRHANNI";
	var options = {};
	options.callback = swizzIt;

	RendererBase.addMetadataDisplay(container, url, null, MICE.render, options);


}
/*
	In a callback passed through via options, you are given access to metadata and the meta-metadata.
	You can probably ignore the meta-metadata.
*/
function swizzIt(metadataAndMetametaData){
	//To make metadata easier to use via js, first unwrap it (it's initially wrapped for cross-compatibility with C#)
	var unwrappedMetadata = BSUtils.unwrap(metadataAndMetametaData.metadata);
	//using unwrapped metadata is super easy and all the cool kids do it
	var textOutput = "And it's only " + unwrappedMetadata.price + "! (ps - a callback made me)";
	var textNode = document.createTextNode(textOutput);
	var textHold = document.getElementById('priceOutput');
	textHold.appendChild(textNode)


}