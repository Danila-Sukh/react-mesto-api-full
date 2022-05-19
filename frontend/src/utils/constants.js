export {
  openPopupProfileButton,
  cardContainer,
  profileName,
  profileJob,
  profilePopup,
  openPopupAddCardButton,
  popupButtonList,
  nameInputElement,
  jobInputElement,
  avatarInputElement,
  avatarEdit,
  buttonDeliteСonfirmation,
  saveButtonCardAdd,
  saveButtonProfile,
  saveButtonAvatar
};

const openPopupProfileButton = document.querySelector('.profile__edit');
const saveButtonCardAdd = document.querySelector('.popup__button-add-card');
const saveButtonProfile = document.querySelector('.popup__button-profile');
const saveButtonAvatar = document.querySelector('.popup__button_save_avatar');

const cardContainer = document.querySelector('.elements');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const profilePopup = document.querySelector('.popup_type_profile-edit');
const openPopupAddCardButton = document.querySelector('.profile__add-card');
const popupButtonList = document.querySelectorAll('.popup__button');
const nameInputElement = document.querySelector('.popup__field_type_name');
const jobInputElement = document.querySelector('.popup__field_type_jobs');
const avatarInputElement = document.querySelector('.popup__field_input_avatar');
const avatarEdit = document.querySelector('.profile__edit-avatar');
const buttonDeliteСonfirmation = document.querySelector('.popup__submit-delete');

