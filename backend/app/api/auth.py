# from fastapi import APIRouter, HTTPException, Depends
# from sqlmodel import Session, select
# from datetime import timedelta

# from app.models.user import User
# from app.core.security import hash_password, verify_password, create_access_token
# from app.db.session import get_session

# router = APIRouter(prefix="/auth", tags=["auth"])

# @router.post("/register")
# def register(username: str, password: str, session: Session = Depends(get_session)):
#     user_exists = session.exec(select(User).where(User.username == username)).first()
#     if user_exists:
#         raise HTTPException(status_code=400, detail="Username already exists")
#     user = User(username=username, hashed_password=hash_password(password))
#     session.add(user)
#     session.commit()
#     session.refresh(user)
#     return {"id": user.id, "username": user.username}

# @router.post("/login")
# def login(username: str, password: str, session: Session = Depends(get_session)):
#     user = session.exec(select(User).where(User.username == username)).first()
#     if not user or not verify_password(password, user.hashed_password):
#         raise HTTPException(status_code=401, detail="Invalid credentials")
#     access_token = create_access_token({"sub": str(user.id)})
#     return {"access_token": access_token, "token_type": "bearer"}











from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from app.models.user import User
from app.db.session import get_session
from app.core.security import verify_password, get_password_hash, create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

# SIGNUP
@router.post("/signup", response_model=dict)
def signup(email: str, password: str, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == email)).first()
    if user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(password)
    new_user = User(email=email, hashed_password=hashed_password)
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return {"email": new_user.email, "id": new_user.id}

# LOGIN
@router.post("/login", response_model=dict)
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    access_token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}

# GET CURRENT USER
from fastapi import Security
from jose import jwt
from app.core.security import decode_access_token

def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)) -> User:
    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")
    user_id = int(payload.get("sub"))
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")
    return user
