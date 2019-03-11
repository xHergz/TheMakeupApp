@ECHO off

SET cnfFile=./TheMakeupApp.cnf
SET databaseName=TheMakeupApp
ECHO CNF File: %cnfFile%
ECHO Database: %databaseName%

REM Create the database
call:runMySqlCommand "CREATE DATABASE IF NOT EXISTS %databaseName%;"

REM Create the Tables
call:runMySqlFile "./Tables/SystemConfiguration.sql"
call:runMySqlFile "./Tables/User.sql"
call:runMySqlFile "./Tables/Session.sql"
call:runMySqlFile "./Tables/SessionAction.sql"
call:runMySqlFile "./Tables/SessionLog.sql"
call:runMySqlFile "./Tables/UserAction.sql"
call:runMySqlFile "./Tables/UserLog.sql"
call:runMySqlFile "./Tables/HairColour.sql"
call:runMySqlFile "./Tables/EyeColour.sql"
call:runMySqlFile "./Tables/SkinTone.sql"
call:runMySqlFile "./Tables/ClientProfile.sql"
call:runMySqlFile "./Tables/HeadshotType.sql"
call:runMySqlFile "./Tables/ClientHeadshot.sql"
call:runMySqlFile "./Tables/AllergySensitivity.sql"
call:runMySqlFile "./Tables/ClientAllergySensitivity.sql"
call:runMySqlFile "./Tables/ProductPreference.sql"
call:runMySqlFile "./Tables/ClientProductPreference.sql"
call:runMySqlFile "./Tables/ArtistApplication.sql"
call:runMySqlFile "./Tables/ArtistCredential.sql"
call:runMySqlFile "./Tables/ExistingPortfolioLink.sql"
call:runMySqlFile "./Tables/SanitizationQuizQuestion.sql"
call:runMySqlFile "./Tables/SanitizationQuizAnswer.sql"
call:runMySqlFile "./Tables/SanitizationQuizSubmission.sql"
call:runMySqlFile "./Tables/MakeoverType.sql"
call:runMySqlFile "./Tables/ServiceType.sql"
call:runMySqlFile "./Tables/ConsultationType.sql"
call:runMySqlFile "./Tables/ArtistPortfolio.sql"
call:runMySqlFile "./Tables/ArtistMakeoverOffered.sql"
call:runMySqlFile "./Tables/ArtistService.sql"
call:runMySqlFile "./Tables/ArtistServiceConsultation.sql"
call:runMySqlFile "./Tables/ArtistServiceAddon.sql"
call:runMySqlFile "./Tables/ArtistQualification.sql"
call:runMySqlFile "./Tables/ArtistPortfolioPicture.sql"
call:runMySqlFile "./Tables/MakeoverAppointment.sql"
call:runMySqlFile "./Tables/MakeoverAppointmentAddon.sql"
call:runMySqlFile "./Tables/ArtistReview.sql"
call:runMySqlFile "./Tables/ArtistReviewReply.sql"
call:runMySqlFile "./Tables/ArtistReviewPictureLink.sql"
call:runMySqlFile "./Tables/ClientReview.sql"
call:runMySqlFile "./Tables/NotificationType.sql"
call:runMySqlFile "./Tables/Notification.sql"

REM Create the Views
call:runMySqlFile "./Views/FullSessionLog.sql"
call:runMySqlFile "./Views/FullUserLog.sql"

REM Create the Functions
call:runMySqlFile "./Functions/DoesUserEmailExist.sql"
call:runMySqlFile "./Functions/DoesUserDisplayNameExist.sql"
call:runMySqlFile "./Functions/DoesSessionOwnUser.sql"
call:runMySqlFile "./Functions/IsSessionAuthorizedForSession.sql"
call:runMySqlFile "./Functions/IsSessionKeyValid.sql"
call:runMySqlFile "./Functions/IsUserArtist.sql"
call:runMySqlFile "./Functions/IsUserClient.sql"
call:runMySqlFile "./Functions/GetSessionIdBySessionKey.sql"
call:runMySqlFile "./Functions/GetSystemConfigValue.sql"
call:runMySqlFile "./Functions/GetUserIdByDisplayName.sql"
call:runMySqlFile "./Functions/GetUserIdBySessionKey.sql"
call:runMySqlFile "./Functions/DoesUserIdExist.sql"
call:runMySqlFile "./Functions/GetClientProfileIdByDisplayName.sql"
call:runMySqlFile "./Functions/DoesAllergySensitivityIdExist.sql"
call:runMySqlFile "./Functions/DoesArtistPortfolioIdExist.sql"
call:runMySqlFile "./Functions/DoesClientHaveAllergySensitivity.sql"
call:runMySqlFile "./Functions/DoesClientHaveHeadshotType.sql"
call:runMySqlFile "./Functions/DoesClientHaveProductPreference.sql"
call:runMySqlFile "./Functions/DoesClientProfileIdExist.sql"
call:runMySqlFile "./Functions/DoesEyeColourIdExist.sql"
call:runMySqlFile "./Functions/DoesHairColourIdExist.sql"
call:runMySqlFile "./Functions/DoesHeadshotTypeIdExist.sql"
call:runMySqlFile "./Functions/DoesProductPreferenceIdExist.sql"
call:runMySqlFile "./Functions/DoesSkinToneIdExist.sql"
call:runMySqlFile "./Functions/DoesUserHaveClientProfile.sql"
call:runMySqlFile "./Functions/DoesClientReviewIdExist.sql"
call:runMySqlFile "./Functions/DoesClientHeadshotIdExist.sql"
call:runMySqlFile "./Functions/GetClientProfileIdBySessionKey.sql"
call:runMySqlFile "./Functions/DoesSessionOwnClientProfile.sql"
call:runMySqlFile "./Functions/DoesSessionOwnClientHeadshot.sql"
call:runMySqlFile "./Functions/DoesSessionOwnClientReview.sql"
call:runMySqlFile "./Functions/GetArtistPortfolioIdByDisplayName.sql"
call:runMySqlFile "./Functions/GetArtistPortfolioIdBySessionKey.sql"
call:runMySqlFile "./Functions/DoesArtistApplicationIdExist.sql"
call:runMySqlFile "./Functions/DoesSanitizationQuizAnswerBelongToQuestion.sql"
call:runMySqlFile "./Functions/DoesSanitizationQuizAnswerIdExist.sql"
call:runMySqlFile "./Functions/DoesSanitizationQuizQuestionIdExist.sql"
call:runMySqlFile "./Functions/DoesArtistMakeoverOfferedIdExist.sql"
call:runMySqlFile "./Functions/DoesArtistOfferMakeover.sql"
call:runMySqlFile "./Functions/DoesArtistPortfolioPictureIdExist.sql"
call:runMySqlFile "./Functions/DoesArtistQualificationIdExist.sql"
call:runMySqlFile "./Functions/DoesArtistServiceAddonIdExist.sql"
call:runMySqlFile "./Functions/DoesArtistServiceConsultationIdExist.sql"
call:runMySqlFile "./Functions/DoesArtistServiceIdExist.sql"
call:runMySqlFile "./Functions/DoesConsultationTypeIdExist.sql"
call:runMySqlFile "./Functions/DoesMakeoverTypeIdExist.sql"
call:runMySqlFile "./Functions/DoesServiceTypeIdExist.sql"
call:runMySqlFile "./Functions/DoesArtistMakeoverOfferedHaveService.sql"
call:runMySqlFile "./Functions/DoesArtistServiceHaveConsultation.sql"
call:runMySqlFile "./Functions/DoesUserHaveArtistPortfolio.sql"

REM Create the Stored Procedures
call:runMySqlFile "./Stored Procedures/LogSessionCreation.sql"
call:runMySqlFile "./Stored Procedures/LogSessionDeactivation.sql"
call:runMySqlFile "./Stored Procedures/CreateSession.sql"
call:runMySqlFile "./Stored Procedures/DeactivateSession.sql"
call:runMySqlFile "./Stored Procedures/LogUserCreation.sql"
call:runMySqlFile "./Stored Procedures/LogUserUpdate.sql"
call:runMySqlFile "./Stored Procedures/LogUserDeactivation.sql"
call:runMySqlFile "./Stored Procedures/CreateUser.sql"
call:runMySqlFile "./Stored Procedures/UpdateUser.sql"
call:runMySqlFile "./Stored Procedures/DeactivateUser.sql"
call:runMySqlFile "./Stored Procedures/GetUsersPasswordHash.sql"
call:runMySqlFile "./Stored Procedures/GetSessionInfo.sql"
call:runMySqlFile "./Stored Procedures/GetUserNotifications.sql"
call:runMySqlFile "./Stored Procedures/GetNumberOfNewUserNotifications.sql"
call:runMySqlFile "./Stored Procedures/AddAlertUserNotification.sql"
call:runMySqlFile "./Stored Procedures/AddTaskUserNotification.sql"
call:runMySqlFile "./Stored Procedures/AcknowledgeUserNotifications.sql"
call:runMySqlFile "./Stored Procedures/GetUser.sql"
call:runMySqlFile "./Stored Procedures/GetClientAllergiesAndSensitivities.sql"
call:runMySqlFile "./Stored Procedures/GetClientHeadshots.sql"
call:runMySqlFile "./Stored Procedures/GetClientProductPreferences.sql"
call:runMySqlFile "./Stored Procedures/GetClientProfile.sql"
call:runMySqlFile "./Stored Procedures/GetClientReviews.sql"
call:runMySqlFile "./Stored Procedures/CreateClientProfile.sql"
call:runMySqlFile "./Stored Procedures/AddClientHeadshot.sql"
call:runMySqlFile "./Stored Procedures/AddClientAllergySensitivity.sql"
call:runMySqlFile "./Stored Procedures/AddCustomAllergySensitivity.sql"
call:runMySqlFile "./Stored Procedures/AddClientProductPreference.sql"
call:runMySqlFile "./Stored Procedures/AddCustomProductPreference.sql"
call:runMySqlFile "./Stored Procedures/AddClientReview.sql"
call:runMySqlFile "./Stored Procedures/UpdateClientProfile.sql"
call:runMySqlFile "./Stored Procedures/UpdateClientReview.sql"
call:runMySqlFile "./Stored Procedures/GetAllergiesAndSensitivities.sql"
call:runMySqlFile "./Stored Procedures/GetProductPreferences.sql"
call:runMySqlFile "./Stored Procedures/GetEyeColours.sql"
call:runMySqlFile "./Stored Procedures/GetHairColours.sql"
call:runMySqlFile "./Stored Procedures/GetSkinTones.sql"
call:runMySqlFile "./Stored Procedures/DeleteClientAllergySensitivity.sql"
call:runMySqlFile "./Stored Procedures/DeleteClientHeadshot.sql"
call:runMySqlFile "./Stored Procedures/DeleteClientProductPreference.sql"
call:runMySqlFile "./Stored Procedures/DeleteClientReview.sql"
call:runMySqlFile "./Stored Procedures/AddExistingPortfolioLink.sql"
call:runMySqlFile "./Stored Procedures/AddSanitizationQuizSubmission.sql"
call:runMySqlFile "./Stored Procedures/CreateArtistApplication.sql"
call:runMySqlFile "./Stored Procedures/GetSanitizationQuizAnswers.sql"
call:runMySqlFile "./Stored Procedures/GetSanitizationQuizQuestion.sql"
call:runMySqlFile "./Stored Procedures/GetSanitizationQuizQuestionIds.sql"
call:runMySqlFile "./Stored Procedures/CreateArtistPortfolio.sql"
call:runMySqlFile "./Stored Procedures/GetArtistPortfolio.sql"
call:runMySqlFile "./Stored Procedures/UpdateArtistPortfolio.sql"
call:runMySqlFile "./Stored Procedures/AddArtistPortfolioPicture.sql"
call:runMySqlFile "./Stored Procedures/GetArtistPortfolioPictures.sql"
call:runMySqlFile "./Stored Procedures/DeleteArtistPortfolioPicture.sql"
call:runMySqlFile "./Stored Procedures/AddArtistQualification.sql"
call:runMySqlFile "./Stored Procedures/GetArtistQualifications.sql"
call:runMySqlFile "./Stored Procedures/DeleteArtistQualification.sql"
call:runMySqlFile "./Stored Procedures/AddArtistMakeoverOffered.sql"
call:runMySqlFile "./Stored Procedures/DeleteArtistMakeoverOffered.sql"
call:runMySqlFile "./Stored Procedures/GetArtistMakeoversOffered.sql"
call:runMySqlFile "./Stored Procedures/GetMakeoverTypes.sql"
call:runMySqlFile "./Stored Procedures/AddArtistService.sql"
call:runMySqlFile "./Stored Procedures/DeleteArtistService.sql"
call:runMySqlFile "./Stored Procedures/GetArtistServices.sql"
call:runMySqlFile "./Stored Procedures/GetServiceTypes.sql"
call:runMySqlFile "./Stored Procedures/AddArtistServiceAddon.sql"
call:runMySqlFile "./Stored Procedures/DeleteArtistServiceAddon.sql"
call:runMySqlFile "./Stored Procedures/GetArtistServiceAddons.sql"
call:runMySqlFile "./Stored Procedures/AddArtistServiceConsultation.sql"
call:runMySqlFile "./Stored Procedures/DeleteArtistServiceConsultation.sql"
call:runMySqlFile "./Stored Procedures/GetArtistServiceConsultations.sql"
call:runMySqlFile "./Stored Procedures/GetConsultationTypes.sql"

REM Insert the initial data
call:runMySqlFile "./Data/SystemConfigurationData.sql"
call:runMySqlFile "./Data/UserActionData.sql"
call:runMySqlFile "./Data/SessionActionData.sql"
call:runMySqlFile "./Data/HairColourData.sql"
call:runMySqlFile "./Data/EyeColourData.sql"
call:runMySqlFile "./Data/SkinToneData.sql"
call:runMySqlFile "./Data/HeadshotTypeData.sql"
call:runMySqlFile "./Data/AllergySensitivityData.sql"
call:runMySqlFile "./Data/ProductPreferenceData.sql"
call:runMySqlFile "./Data/SanitizationQuizQuestionData.sql"
call:runMySqlFile "./Data/SanitizationQuizAnswerData.sql"
call:runMySqlFile "./Data/MakeoverTypeData.sql"
call:runMySqlFile "./Data/ServiceTypeData.sql"
call:runMySqlFile "./Data/ConsultationTypeData.sql"
call:runMySqlFile "./Data/NotificationTypeData.sql"

ECHO Press any key to close...
SET /p closeWindow=

goto:eof

:runMySqlCommand
ECHO Executing command: %~1
mysql --defaults-extra-file=%cnfFile% -e "%~1"
goto:eof

:runMySqlFile
ECHO Running file: %~1
mysql --defaults-extra-file=%cnfFile% %databaseName% < "%~1"
goto:eof