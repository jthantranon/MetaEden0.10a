$(document).ready(function(){
	
	
	function GenBtnMaker(id,value,context){
		var context = context || $('body');
		context.append("<input type='button' id='"+id+"' value='"+value+"'>");
	};
	
	function DotSplitter(string){
		return string.split('.')
	}
	
	Glass = new EdenGlass();
	OpenSesh();
	$.getJSON("/cic/immigration",function(data){
		if (data.tutorial == 0){
			$.getScript('/js/tutorial.js',function(){
				t = new Tutorial('English',data);
				id = 'tutorial0';
				console.debug(t);
				Glass.create({id:id,title:t.zeroTitle,context:'body'});
				Glass.append(id, t.zeroContent+' ');
				Glass.aSubmitButton(id, 'Dismiss', 'dTutorialZero');
				$('#dTutorialZero').on('click',function(){
					Glass.destroy(id);
					$.post('/cic/incTutorial',function(data){
						console.debug(data);
					});
				});
			});
			console.debug(data);
		}
		
		myAvatar.getAvatar().position.x = 6;
		
		var vitalsHUD = Glass.ActualizeHUD({muse:data},'CMuse');
		var nodeHUD = Glass.ActualizeHUD({muse:data},'CNode');
		
		GenBtnMaker('Test','Place CityHall',vitalsHUD);
		GenBtnMaker('MuseumRemove','Remove CityHall',vitalsHUD);
		
//		vitalsHUD.append('test');
//		nodeHUD.append('test');
		
		console.debug(data);
		
		$.each(data.OtherMusesHere,function(){
			var split = DotSplitter(this);
			var id = split[0];
			var name = split[1];
			GenBtnMaker('MuseIcon'+id,name)
		});
		
		$.each(data.OrbsHere,function(){
			var split = DotSplitter(this);
			var id = split[0];
			var name = split[1];
			GenBtnMaker('OrbIcon'+id,name)
		});
		
	});
		
	$('.chatWrapper').fadeTo(3000, 1);
	
	// default scene properties
	///////////////////////////////////
	var	clock = new THREE.Clock();		
	
	// main scene
	///////////////////////////////////	
	var myWorld = new ME3D.Scene();
	
	// init physics
	///////////////////////////////////	
	var myPhysics = new ME3D.Physics();
	var myBounds = new ME3D.Bounds();
	
		
	
	// environment
	///////////////////////////////////
	var myStage = new ME3D.Stage();
	myWorld.scene.add(myStage.getStage());
	//myPhysics.addStiffBody(myStage.getBase());
	console.log(myBounds.getBoundsMin(myStage.getBase()));
	console.log(myBounds.getBoundsMax(myStage.getBase()));
	var stageBounds = myBounds.getBoundsMax(myStage.getBase());	
	myPhysics.addCalcStiffBody(myStage.getBase(),stageBounds);
	//var myBounds = new ME3D.Bounds();
	//var baseBody = myBounds.computePlane(myStage.getBase());
	//myPhysics.addPremadeBody();
	
	
	// grid
	///////////////////////////////////
	var myGrid = new ME3D.Grid(2,.5,11);
	myWorld.scene.add(myGrid.getGrid());
	var gridChildren = myGrid.getChildren();
	
	for(var i=0,j=gridChildren.length; i<j; i++){
		var gridSquareBounds = myBounds.getBoundsMin(gridChildren[i]);
		myPhysics.addMassBody(gridChildren[i],gridSquareBounds,0);		
	};
	
	
	// avatar
	///////////////////////////////////
	var myAvatar = new ME3D.Avatar();
	myWorld.scene.add(myAvatar.getAvatar());
	myAvatar.getAvatar().position.y += 2;
	console.log(myBounds.getBoundsMax(myAvatar.getBoundsMesh()));
	var avatarBounds = myBounds.getBoundsMax(myAvatar.getBoundsMesh());
	avatarBounds.multiplyScalar(2);
	console.log(avatarBounds);
	var avatarController = myPhysics.addMassBody(myAvatar.getAvatar(),avatarBounds,3);	
	//var avatarController = myPhysics.addRigidBody(myAvatar.getAvatar());
	
	
	
	// STUPID CUBE TEST
	///////////////////
	var geo = new THREE.CubeGeometry(1,1,1);
	var mat = new THREE.MeshNormalMaterial({side:THREE.DoubleSide});
	var cube = new THREE.Mesh(geo,mat);
	
	cube.useQuaternion = true;
	var quaternion = new THREE.Quaternion();
	quaternion.setFromAxisAngle( new THREE.Vector3( 1, 0, 0 ), ME3D.de2ra(-45) );
    cube.quaternion.copy(quaternion);
   	cube.position.y = 4;
   	
    myWorld.scene.add(cube);
    console.log(myBounds.getBoundsMax(cube));
	var cubeBounds = myBounds.getBoundsMax(cube);	
	myPhysics.addMassBody(cube,cubeBounds,.1);
   	//var cubeController = myPhysics.addRigidBody(cube);
	///////////////////
	
	// emitter
	///////////////////////////////////
	var myEmitter = new ME3D.Emitter();
	myAvatar.avatar.add(myEmitter.getSystem());
	
	// BUILDINGS!!
	///////////////////////////////////
	myBuilder = new ME3D.Builder(myWorld.scene, myPhysics);
 	//myBuilder.makeBuilding(4, new THREE.Vector3(1,1,1), new THREE.Vector3(-2.5,0,0), 'City Hall');
 	
 	function aStack(name,floors,x,y,xl,yl){
		y = y * -2.5
		x = x * -2.5
		var xl = xl || '1';
		var yl = yl || '1';
		myBuilder.makeBuilding(floors, new THREE.Vector3(xl,1,yl), new THREE.Vector3(y,0,x), name);
		//myBuilder('models/base.json', 'models/floor.json', 'models/crown.json', floors, new THREE.Vector3(xl,1,yl), myWorld, new THREE.Vector3(y,0,x),name);
		//alert(buildingGroup.getChildByName(name));
	};
	
	aStack('Test',5,0,0);
	aStack('Test',3,1,0);
	aStack('Test',3,1,1);
	aStack('Test',3,0,1);
	aStack('Test',3,-1,1);
	aStack('Test',3,-1,0);
	aStack('Test',3,-1,-1);
	aStack('Test',3,0,-1);
	aStack('Test',3,1,-1);

	// PICKING!!
	///////////////////////////////////
	var myPicker = new ME3D.Picker(myWorld.scene, myWorld.camera);
		
	// debug
	///////////////////////////////////
	myStage.log();
	
	// controls	
	///////////////////////////////////
	var controlsA = new ME3D.AvatarControls(avatarController, myAvatar.avatar);
	//var controlsC = new ME3D.CameraControls(myWorld.camera);
	//var controls = new ME3D.AvatarControls(cube);
	
	// UGH, NO WAY AROUND THIS RIGHT NOW...
	var resolveControls = function() {
		var delta = clock.getDelta();
	    controlsA.update( delta );
	    //controlsC.update( delta );
	    //myAvatar.bindCamera(myWorld.camera);
	    myWorld.camera.position.x = myAvatar.avatar.getChildPosition('cameraTarget').x;
	    myWorld.camera.position.y = myAvatar.avatar.getChildPosition('cameraTarget').y;
	    myWorld.camera.position.z = myAvatar.avatar.getChildPosition('cameraTarget').z;
	    //myWorld.camera.position.z = myAvatar.avatar.position.z;
	    //console.log(myAvatar.avatar.getChildPosition('cameraActual'));
	    myEmitter.update(delta);
	    myPicker.pick();
	    myPicker.pickBuilding();
	    
	    
	}
	
	
	console.log(myAvatar.avatar);
	

	// renderer
	///////////////////////////////////
	var myRenderer = new ME3D.Render(myWorld.scene, myWorld.camera);
	myRenderer.queueRender(resolveControls,'');
	myRenderer.queueAnimation(runPhysics,'');

});