G.AddData({
name:'Trash Collectors',
author:'Eiim',
desc:'A simple mod that adds trash collection.',
engineVersion:1,
manifest:'modManifest.js',
requires:['Default dataset*'],
sheets:{'gcSheet':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAB2UlEQVRIS7WWvU4CQRSFBxPRTiOBQmOMovhDrLBBbXgCaYyhsKAQO30GEytLO2mo6dAXsMHEAir/EtRYGI3RoBJjokTBnCF3chl2dhcJ07DDzj3fPXfu7K5HdHl4TPqbqVS9HfZBOm2p1fQnFy0Ui6JarUqG1+s1Xp/1DInpryexGI2qfDhMAbbj/fX8fdiVqBMYMIJIAMTxm9j9FRuJGZnJrW9KBMvXysHd4KUYeZ60dcPBC5GIhEhA9iggAXs7o8oBAD+fH9I+SuQEeAyXxPBFSCWkABAfm3gTmf2kSG5llAOIUn0JgOjx97mWMj4EboTHX1MA2g/p4PS8tw7xlXhcHOZyaqPsNhlgjPnaq3SGsRpcb2k6VSJ0DwA0OMhtq1rF2wIQUO6rCN/3gHSmC9Aca/LZ45b7SMwSUHqpiKuTRgCCMbiALsjniMVAvCWALzBlaMoY6xEf8jccGwG0oN2SzC7FpGjHAIggQwhCjOauHPAuMjmwA+hd6NhFdkDdwfJaTHYcJWDsIm4Z13pXUdtaAbCe7rsGEBAZcgF9U//tgAN4CfRNdXWS+cHSM3TadNcAU407AqAMeOBRHe2ePXoTmE520xuN2pG/k91kzEtKGtQ9NO/6V8UfACLhKDYH++cAAAAASUVORK5CYII='},//custom stylesheet (note : broken in IE and Edge for the time being)
func:function()
{	
	//First we create a couple new resources :
	new G.Res({
		name:'hot pepper',
		desc:'[hot pepper]s are loaded with capsaicin and, depending on who you ask, may produce a pleasant burn when eaten.',
		icon:[0,0,'spicySheet'],
		turnToByContext:{'eat':{'health':0.01,'happiness':0.03},'decay':{'spoiled food':0.5}},//this basically translates to : "when eaten, generate some health and happiness; when rotting, turn into either nothing or some spoiled food"
		partOf:'food',
		category:'food',
	});
	new G.Res({
		name:'hot sauce',
		desc:'Made from [herb]s and the [hot pepper,Spiciest peppers], this [hot sauce] stays fresh for a while and will leave anyone panting and asking for more.',
		icon:[1,0,'spicySheet'],
		turnToByContext:{'eat':{'health':0.03,'happiness':0.1},'decay':{'hot sauce':0.95,'spoiled food':0.05}},//that last part makes hot sauce effectively have a 95% chance of simply not rotting (in effect, it decays into itself)
		partOf:'food',
		category:'food',
	});
	
	new G.Unit({
		name:'garbage collector',
		desc:'@removes [spoiled food] and [muddy water]',
		icon:[0,0, 'gcSheet'],
		cost:{},
		use:{'worker':1},
		staff:{'stone tools':1},
		upkeep:{'coin':0.1},
		gizmos:true,
		modes:{
			'food removal':{name:'Remove [spoiled food]',icon:[3,7,3,7],desc:'Remove 100 [spoiled food].'},
			'water removal':{name:'Remove [muddy water]',icon:[8,6,8,6],desc:'Remove 100 [muddy water].'}
		},
		effects:[
			{type:'convert',from:{'spoiled food':100},into:{'spoiled food':0},every:1,repeat:1,mode:'food removal'},
			{type:'convert',from:{'muddy water':100},into:{'muddy water':0},every:1,repeat:1,mode:'water removal'},
			{type:'mult',value: 2,req:{'cleanliness':true}}
		],
		req:{'garbage collection':true},
		category:'production',
	});
	
	new G.Tech({
		name:'garbage collection',
		desc:'@your people learn that keeping rotten food around is suboptimal.',
		icon:[0,0,'gcSheet'],
		cost:{'insight':10},
		req:{'tool-making':true},
	});
	
	new G.Trait({
		name:'cleanliness',
		desc:'@[garbage collectors] clean trash twice as fast.',
		icon:[0,0,'gcSheet'],
		chance:10,
		req:{'garbage collection':true},
		effects:[
			{type:'function',func:function(){G.getDict('garbage collector').turnToByContext['effects']['food removal']=0.2;}},//this is a custom function executed when we gain the trait
		],
	});
	
}
});