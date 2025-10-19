Final_Game.js
document.getElementById("LevelSwitch").addEventListener("click", changeSceneToLevel2);
document.getElementById("computerbone").addEventListener("click", function() {collectBone("computerbone")});
document.getElementById("tablebone").addEventListener("click", function() {collectBone("tablebone")});
document.getElementById("whiteboardbone").addEventListener("click", function() {collectBone("whiteboardbone")});
document.getElementById("standingPlant").addEventListener("click", knockPlant);
document.getElementById("flashlight").addEventListener("click", levelComplete);
document.getElementById("pressStart").addEventListener("click", startGame)
//document.getElementById("menu").addEventListener("click", toLevel1)
document.getElementById("nextLevel").addEventListener("click", changeSceneToLevel2)
document.getElementById("menuButton").addEventListener("click", toNewMenu)
document.getElementById("elevatorbone").addEventListener("click", function() {collectBone("elevatorbone")});
document.getElementById("bannerbone").addEventListener("click", function() {collectBone("bannerbone")});
document.getElementById("plantbone").addEventListener("click", function() {collectBone("plantbone")});
document.getElementById("idCard").addEventListener("click", levelComplete);
document.getElementById("Level2StartUnlocked").addEventListener("click", toLevel2NewMenu);
document.getElementById("Level1StartUnlocked").addEventListener("click", toLevel1NewMenu);
document.getElementById("Level1Start").addEventListener("click", toLevel1);

let numBones1 = 0

function toLevel1NewMenu() {
    document.getElementById("menuUnlocked").style.display = "none";
    let Level1 = ["Level1", "bottom_of_computer", "computerbone", "pencil_bag", "table", "tablebone", "top_of_computer", "whiteboardbone"];
    for (let i = 0; i < Level1.length; i++) {
        document.getElementById(Level1[i]).style.display = "block";
    }

    let draggableItems = document.querySelectorAll('.cover-box');
    draggableItems.forEach(item => {
        item.classList.remove('found'); // allow dragging again
    });
}

function toLevel2NewMenu() {
    document.getElementById("menuUnlocked").style.display = "none";
    let Level2 = ["Level2", "bannerbone", "elevatorbone", "flashlightLight", "plantbone", "standingPlant"];
    for (let i = 0; i < Level2.length; i++) {
        document.getElementById(Level2[i]).style.display = "block";
    }
}

function collectBone(bone) {
    numBones1++;
    let bones = ["bone1", "bone2", "bone3"];
    document.getElementById(bone).style.display = "none";
    for(i = 0; i < 3; i++) {
        const boneEl = document.getElementById(bones[i]);
        if (window.getComputedStyle(boneEl).display === "none") {
            boneEl.style.display = "block";
            break; // Only show one bone at a time
        }
    }
}

function startGame() {
    document.getElementById("pressStart").style.display = "none";
    document.getElementById("menu").style.display = "block";
     
}

function toLevel1() {
    document.getElementById("menu").style.display = "none";
    let Level1 = ["Level1", "bottom_of_computer", "computerbone", "pencil_bag", "table", "tablebone", "top_of_computer", "whiteboardbone"];
    for (let i = 0; i < Level1.length; i++) {
        document.getElementById(Level1[i]).style.display = "block";
    }
    let draggableItems = document.querySelectorAll('.cover-box');
    draggableItems.forEach(item => {
        item.classList.remove('found'); // allow dragging again
    });
}

function levelComplete() {
    let Level1 = ["Level1", "bottom_of_computer", "computerbone", "pencil_bag", "table", "tablebone", "top_of_computer", "whiteboardbone"]; 
    let Level2 = ["Level2", "bannerbone", "elevatorbone", "flashlightLight", "plantbone", "standingPlant", "fallenPlant", "idCard"];
    let complete = ["complete", "nextLevel", "menuButton"]
    
    document.getElementById("pencil_bag").style.top = '510px';
    document.getElementById("pencil_bag").style.left = '300px';


    setTimeout(() => {
        for (let i = 0; i < Level1.length; i++) {
            document.getElementById(Level1[i]).style.display = "none";
        }
        for (let i = 0; i < Level2.length; i++) {
            document.getElementById(Level2[i]).style.display = "none";
        }
        for (let i = 0; i < complete.length; i++) {
            document.getElementById(complete[i]).style.display = "block";
        }
    }, 10); 

    let boneScore = ["oneBone", "twoBone", "threeBone"]
    for(let i = 0; i<numBones1; i++) {
        document.getElementById(boneScore[i]).style.display = "block";

    }
    let bones = ["bone1", "bone2", "bone3"];
    for(let i = 0; i<numBones1; i++) {
        document.getElementById(bones[i]).style.display = "none";

    }
    numBones1=0;


}

function toNewMenu() {
    let transition = ["complete", "nextLevel", "menuButton"];
    
    setTimeout(() => {
        for (let i = 0; i < transition.length; i++) {
            document.getElementById(transition[i]).style.display = "none";
        }
    }, 10);
    document.getElementById("menuUnlocked").style.display = "block";
    
}

function changeSceneToLevel2() {
    document.getElementById("Pressed").style.display = "none";
    let transition = ["complete", "nextLevel", "menuButton"]; 
    let Level2 = ["Level2", "bannerbone", "elevatorbone", "flashlightLight", "plantbone", "standingPlant"];
    setTimeout(() => {
        for (let i = 0; i < transition.length; i++) {
            document.getElementById(transition[i]).style.display = "none";
        }
        for (let i = 0; i < Level2.length; i++) {
            document.getElementById(Level2[i]).style.display = "block";
        }
    }, 10);   
}

// create function for change to level 3

function knockPlant(){
    document.getElementById("standingPlant").style.display = "none";
    document.getElementById("fallenPlant").style.display = "block";
    document.getElementById("idCard").style.display = "block";
}

const container = document.getElementById('Level1');
        let currentBox = null;
        let xOffset = 0;
        let yOffset = 0;
        let velocityY = 0;
        let animationFrameId = null;
        const GRAVITY = 1.0;

        function getClientCoords(e) {
            return e.touches ? e.touches[0] : e;
        }

        function startDrag(e) {
            
            // CRITICAL JS CHECK: If the target is the image, switch to the parent box.
            let clickedElement = e.target;
            if (clickedElement.tagName === 'IMG') {
                clickedElement = clickedElement.parentElement;
            }

            if (clickedElement.classList.contains('found')) return;
            
            e.preventDefault();
            const client = getClientCoords(e);
            currentBox = clickedElement;
            
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            velocityY = 0;

            xOffset = client.clientX - currentBox.getBoundingClientRect().left;
            yOffset = client.clientY - currentBox.getBoundingClientRect().top;
            
            document.addEventListener('mousemove', drag, false);
            document.addEventListener('mouseup', endDrag, false);
            document.addEventListener('touchmove', drag, false);
            document.addEventListener('touchend', endDrag, false);
        }

        function drag(e) {
            if (!currentBox) return;

            const client = getClientCoords(e);
            const containerRect = container.getBoundingClientRect();

            let newX = client.clientX - containerRect.left - xOffset;
            let newY = client.clientY - containerRect.top - yOffset;
            
            newX = Math.max(0, Math.min(newX, containerRect.width - currentBox.offsetWidth));
            newY = Math.max(0, Math.min(newY, containerRect.height - currentBox.offsetHeight));

            currentBox.style.left = `${newX}px`;
            currentBox.style.top = `${newY}px`;
        }


        function endDrag() {
            if (!currentBox) return;

            document.removeEventListener('mousemove', drag, false);
            document.removeEventListener('mouseup', endDrag, false);
            document.removeEventListener('touchmove', drag, false);
            document.removeEventListener('touchend', endDrag, false);

            
            dropBox(currentBox);
            currentBox = null;
            
        }


        // --- GRAVITY SIMULATION ---
        function dropBox(box) {
            
            if (box.classList.contains('found')) return; 
            const maxTop = container.offsetHeight - box.offsetHeight;

            box.classList.add('found');

            function animateFall() {
                
                velocityY += GRAVITY;
                let newTop = box.offsetTop + velocityY;

                if (newTop >= maxTop) {
                    newTop = maxTop;
                    velocityY = 0;
                    cancelAnimationFrame(animationFrameId);
                    box.style.top = `${newTop}px`;
                    return; 
                }

                box.style.top = `${newTop}px`;
                animationFrameId = requestAnimationFrame(animateFall);
            }

            animateFall();
        }
        
        // --- INITIALIZATION ---
        window.onload = function() {
            const coverBoxes = document.querySelectorAll('.cover-box');
            
            coverBoxes.forEach(box => {
                box.addEventListener('mousedown', startDrag, false);
                box.addEventListener('touchstart', startDrag, false);
            });
            
            document.body.addEventListener('touchmove', (e) => {
                if(currentBox) e.preventDefault();
            }, { passive: false });
        };
