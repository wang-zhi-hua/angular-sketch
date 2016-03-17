var sketch=angular.module('sketch',[]);
sketch.controller('sketchController', ['$scope', function($scope){
	$scope.canvasWH={width:670,height:470};

    $scope.csState={
    	fillStyle:'#000000',
    	strokeStyle:'#000000',
    	lineWidth:'1',
        style:'stroke'
    }
    $scope.setStyle=function(s){
        $scope.csState.style=s;
    }
    $scope.newSketch=function(){
    	if(current){
    		if(confirm('是否保存')){
    			location.href=canvas.toDataURL();
    		}
    	}
    	clearCanvas();
    	current=null;
    }
    $scope.save=function(ev){
    	if(current){
    	ev.srcElement.href=canvas.toDataURL();
    	ev.srcElement.download='mypic.png';
        }else{
        	alert('空画布');
        }
    }

    $scope.tools={
    	'画线':'line',
    	'画圆':'arc',
    	'矩形':'rect',
    	'橡皮':'erase',
    	'铅笔':'pen',
    	'选择':'select',
    };
    $scope.tool='line';
    $scope.settool=function(tool){
        $scope.tool=tool;
    }


    var canvas=document.querySelector('#canvas');
    var ctx=canvas.getContext('2d');
    var current;
    var clearCanvas=function(){
        	ctx.clearRect(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
        }
    var setmousemove={
        	line:function(e){
        		canvas.onmousemove=function(ev){
        		clearCanvas();
		        if(current){
			        ctx.putImageData(current,0,0);
			    }
		    	ctx.beginPath();
		    	ctx.moveTo(e.offsetX,e.offsetY);
		    	ctx.lineTo(ev.offsetX,ev.offsetY);
		    	ctx.stroke();
        	    }
            },
        	arc:function(e){
        	canvas.onmousemove=function(ev){	
        		clearCanvas();
		        if(current){
			        ctx.putImageData(current,0,0);
			    }
		    	ctx.beginPath();
		    	ctx.arc(e.offsetX,e.offsetY,Math.sqrt((ev.offsetX-e.offsetX)*(ev.offsetX-e.offsetX)+(ev.offsetY-e.offsetY)*(ev.offsetY-e.offsetY)),0,Math.PI*2);
		    	if($scope.csState.style=='fill'){
		    		ctx.fill();
		    	}else{
		    		ctx.stroke();
		    	}
		    	
        	    }  
            },
            rect:function(e){
        	canvas.onmousemove=function(ev){	
        		clearCanvas();
		        if(current){
			        ctx.putImageData(current,0,0);
			    }
		    	ctx.beginPath();
		    	if($scope.csState.style=='fill'){
		    		ctx.fillRect(e.offsetX,e.offsetY,(ev.offsetX-e.offsetX),(ev.offsetY-e.offsetY));

		    	}
		    	else{
		    		ctx.strokeRect(e.offsetX,e.offsetY,(ev.offsetX-e.offsetX),(ev.offsetY-e.offsetY));
		    	}
		    	
        	    }  
            },
            pen:function(e){
            ctx.beginPath();
            ctx.moveTo(e.offsetX,e.offsetY);
            canvas.onmousemove=function(ev){	
        		clearCanvas();
		        if(current){
			        ctx.putImageData(current,0,0);
			    }

		    	ctx.lineTo(ev.offsetX,ev.offsetY);
			    ctx.stroke();
        	    } 	
            },
            erase:function(e){
            canvas.onmousemove=function(ev){	
        		
                ctx.clearRect(ev.offsetX,ev.offsetY,100,100);
        	    } 	
            },

        };
        canvas.onmousedown=function(e){
        	    ctx.strokeStyle=$scope.csState.strokeStyle;
        	    ctx.fillStyle=$scope.csState.fillStyle;
        	    ctx.lineWidth=$scope.csState.lineWidth;
                setmousemove[$scope.tool](e);
         document.onmouseup=function(){
    	     canvas.onmousemove=null;
    	     canvas.onmouseup=null;
    	     current=ctx.getImageData(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
       }

    }






}])