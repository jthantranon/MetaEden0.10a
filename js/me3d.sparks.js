/**
 * @author C.Christopher Kovach / http://www.cckovach.com
 * @version 0.1.0
 * Currently creates a generic avatar model and effects for MetaEden.
 */

// TODO: default parameters and arguments
// TODO: evolve avatar design

ME3D.Avatar = function () {
	
	// default properties
	this.avatar = new THREE.Object3D();
	this.body = new THREE.Mesh();
	this.body.useQuaternion = true;
	this.glowie = new THREE.ParticleSystem();
	
	
	this.body.geometry = new THREE.SphereGeometry (.1,20,20);
	this.body.material = new THREE.MeshBasicMaterial({color: 0x00FFFF, side:THREE.DoubleSide, opacity: .75, transparent:true});
	this.avatar.position.x = 0;
	this.avatar.position.y = 0;
	this.avatar.position.z = 0;
	
	
	this.cameraTarget = new THREE.Mesh(new THREE.CubeGeometry(.05,.05,.05), new THREE.MeshNormalMaterial());
	this.cameraActual = new THREE.Mesh(new THREE.CubeGeometry(.025,.025,.025), new THREE.MeshNormalMaterial());
	this.cameraTarget.position.set(2,2,2);
	this.cameraActual.position.set(4,3,3);
	this.cameraTarget.name = 'cameraTarget';
	this.cameraActual.name = 'cameraActual';

	
	// create the particle variables
    var particles = new THREE.Geometry();
    var pMaterial = new THREE.ParticleBasicMaterial({
    	opacity: 1,
    	size: .75,
    	map: THREE.ImageUtils.loadTexture(
    		"textures/particle.png"),
    	blending: THREE.AdditiveBlending,
    	transparent: true,
   	});
   	
   	pMaterial.depthWrite = false;
	var particle = this.body.position;
	
	particles.vertices.push(particle);
	
	// create the particle system
	this.glowie.geometry = particles;
	this.glowie.material = pMaterial;

	this.glowie.sortParticles = true;
	
	//this.emitter
	
	this.avatar.add(this.body);
	this.avatar.add(this.glowie);
	this.avatar.add(this.cameraTarget);
	this.avatar.add(this.cameraActual);
	
	this.avatar.dirtyVertices = true;
	
	// function getBoundsMesh() {
		// return this.body;
	// }	
	
	//return this.avatar;		

};

ME3D.Avatar.prototype = {
	constructor: ME3D.Physics,
	
	getAvatar: function() {
		return this.avatar;
	},
	
	getBoundsMesh: function() {
		return this.body;
	},
	
	bindCamera: function(camera) {
		
		var newPosition = this.avatar.getChildPosition('cameraActual');
		camera.position.set(newPosition);
	},
	
	getCameraPosition: function(camera) {
		
		return this.avatar.getChildPosition('cameraActual');
	}
}

