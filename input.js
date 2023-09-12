
let mStartWidth = window.innerWidth, mStartHeight = window.innerHeight;
let mInterfaceOffsetX = -mStartWidth/2, mInterfaceOffsetY = -mStartHeight/2;
let mInterfaceXMax = mStartWidth/2, mInterfaceYMax = mStartHeight/2;
let mInterfaceX = mInterfaceOffsetX, mInterfaceY = mInterfaceOffsetY, mDiffX = 0, mDiffY = 0, mLastX = -1, mLastY = -1;
let mMouseClickX, mMouseClickY, mMouseLastX, mMouseLastY;
let mMouseDown = false;

function updateScreenPos(pX, pY)
{
    let tElements = document.getElementsByClassName("posmove");
    Array.prototype.forEach.call(tElements, function(tElement) {
        tElement.style.left = (mStartWidth / 2 + pX) + "px";
        tElement.style.top = (mStartHeight / 2 + pY) + "px";
    });
}

function mouseUpdate() 
{
    let tX = mInterfaceX + mDiffX;
    let tY = mInterfaceY + mDiffY;
    if(tX == mLastX && tY == mLastY){
        return;
    }

    updateScreenPos(tX, tY);
    mLastX = tX; mLastY = tY;
}

function mouseDown(pEvent) 
{
    if (pEvent.button !== 0) { 
        return; 
    }

    mMouseClickX = [pEvent.pageX];
    mMouseClickY = [pEvent.pageY];
    mMouseDown = true;
}
  
function mouseUp(pEvent) 
{
    mMouseDown = false;
    mInterfaceX += mDiffX;
    mInterfaceY += mDiffY;
    mDiffX = 0; mDiffY = 0;
}

function mouseMove(pEvent) 
{
    let tMouseCurX = pEvent.pageX, tMouseCurY = pEvent.pageY;
    if (mMouseDown) 
    {
      mDiffX = tMouseCurX - mMouseClickX;
      mDiffY = tMouseCurY - mMouseClickY;

      if(mInterfaceX + mDiffX > mInterfaceXMax + mInterfaceOffsetX || mInterfaceX + mDiffX < -mInterfaceXMax + mInterfaceOffsetX){
        mDiffX = mMouseLastX - mMouseClickX;
      }else{
        mMouseLastX = tMouseCurX;
      }
      if(mInterfaceY + mDiffY > mInterfaceYMax + mInterfaceOffsetY || mInterfaceY + mDiffY < -mInterfaceYMax  + mInterfaceOffsetY){
        mDiffY = mMouseLastY - mMouseClickY;
      }else{
        mMouseLastY = tMouseCurY;
      }
    }
}
