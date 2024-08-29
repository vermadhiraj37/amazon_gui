from tkinter import*
from PIL import ImageTk,Image
from tkinter import messagebox
from numpy.ma.core import resize

def handle_login():
    email=email_input.get()
    password=password_input.get()

    if email=='vermadhiraj37@gmail.com' and password=='1234':
        messagebox.showinfo( 'Log','Login Successful')
    else:
        messagebox.showerror('Error','Login failed')




root=Tk()
root.title('Login Form')
root.iconbitmap('favicon.ico')


root.geometry("350x500")
root.config(background='white')

img=Image.open('Amazon_icon.png')
resized_img=img.resize((70,70))
img=ImageTk.PhotoImage(resized_img)

img_label=Label(root,image=img)
img_label.pack(pady=(10,10))

text_label=Label(root,text='amazon',fg='black',bg='white')
text_label.pack()
text_label.config(font=('verdana',24))

email_label=Label(root,text='Enter Email',fg='black', bg='white')
email_label.pack(pady=(20,5))
email_label.config(font=('verdana',12))

email_input=Entry(root,width=50)
email_input.pack(ipady=6,pady=(1,15))

password_label=Label(root,text='Enter Password',fg='black', bg='white')
password_label.pack(pady=(20,5))
password_label.config(font=('verdana',12))

password_input=Entry(root,width=50)
password_input.pack(ipady=6,pady=(1,15))

login_btn=Button(root,text='Login',fg='white',bg='grey',width=20,height=2, command=handle_login)
login_btn.pack(pady=(10,20))
login_btn.config(font=('verdana',10))

root.mainloop()
