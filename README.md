# repoxpx
Block drawing and pixel rendering

This is a project which can draw blocks according to binary string,and render pixels by complex operations in every frame.

vars:  
`win.fps`:Frame rate.Default is 1 in cube model and 100 in super model.  
`win.num`:Frame couter.  
`win.timed1`:Recording the start time.  
When you restart a process,you had better reset the three variables.  
`data.L`:A binary string.It's used to instruct to draw a block or not.

models:  
cube model:Using data.L to make blocks.  
super model:Performing complex operations each frame.

button and windows:  
Edit:To edit the running code in every frame.  
Save:To save your javascript file with file's name to Bmob.cn.  
Get:To get the files' list and try to select a javascript file to run.  
Switch button:To switch between cube model and super model.

the default functions:  
`getstr2(len)`:Returning a specified binary digit string.  
`fourierpainter()`:Demonstrating simple fourier transform.

And don't forget to use F12.:)