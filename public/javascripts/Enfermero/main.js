var socket = io.connect('http://localhost:3000', { 'forceNew': true });
function render(data) {
	var html = data.map(function(elem, index){
    	return(`<div>
        		<strong>${elem.Correo_usuario}</strong>:
                 <em>${elem.Contrasena}</em>
        </div>`)
    }).join(" ");
    
    document.getElementById('messages').innerHTML = html;//donde queremos que lo pinte
}
socket.on('messages', function(data) {
	console.log(data);
	render(data);
});