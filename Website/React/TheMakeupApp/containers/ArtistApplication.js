import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import FileInput from '../../Common/components/FileInput';
import ListInput from '../../Common/components/ListInput';
import Loader from '../../Common/components/Loader';
import { createArtistApplication } from '../actions/ArtistApplicationActions';
import { getSanitizationQuizQuestions } from '../actions/SanitizationQuizActions';
import setCurrentPage from '../actions/SiteActions';
import FormInfoDisplay from '../components/FormInfoDisplay';
import SanitizationQuiz from '../components/SanitizationQuiz';
import PAGES from '../constants/Pages';

import '../../../Css/ArtistApplication.css';
import Button from '../../Common/components/Button';

class ArtistApplication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            canSubmit: false
        };
        this.artistApplicationInputChanged = this.artistApplicationInputChanged.bind(this);
        this.submitArtistApplication = this.submitArtistApplication.bind(this);
        this.renderSubmitButton = this.renderSubmitButton.bind(this);
        this.resumeInput = React.createRef();
        this.coverLetterInput = React.createRef();
        this.existingPortfolioInput = React.createRef();
        this.sanitizationQuiz = React.createRef();
    }

    componentDidMount() {
        this.props.setCurrentPage(PAGES.ARTIST_APPLICATION.KEY);
        this.props.getSanitizationQuizQuestions();
    }

    artistApplicationInputChanged() {
        if (this.resumeInput.current.getValue() === '' || this.coverLetterInput.current.getValue() === ''
                || !this.sanitizationQuiz.current.isCompleted()) {
            this.setState({
                canSubmit: false
            });
        }
        else {
            this.setState({
                canSubmit: true
            });
        }
    }

    submitArtistApplication() {
        this.props.createArtistApplication(this.props.currentSession.clientProfileId, this.resumeInput.current.getValue(),
            this.coverLetterInput.current.getValue(), this.existingPortfolioInput.current.getValues(),
            this.sanitizationQuiz.current.getQuizAnswers());
    }

    renderSubmitButton() {
        if (this.props.fetchingCreateArtistApplication) {
            return <Loader />;
        }

        return (
            <Button
                label="Submit Application"
                onClickHandler={this.submitArtistApplication}
                disabled={!this.state.canSubmit}
            />
        );
    }

    render() {
        if (this.props.fetchingSanitizationQuizQuestions) {
            return <Loader />;
        }

        if (this.props.artistApplicationSubmitted) {
            return <h1>Congratulations! Your Artist Application has been submitted.</h1>;
        }

        return (
            <div className="artist-application-container">
                <FormInfoDisplay>
                    <div className="application-section">
                        <h1>Resume (Required):</h1>
                        <FileInput
                            ref={this.resumeInput}
                            label="Select Resume"
                            onValueChanged={this.artistApplicationInputChanged}
                        />
                    </div>
                    <div className="application-section">
                        <h1>Cover Letter (Required):</h1>
                        <FileInput
                            ref={this.coverLetterInput}
                            label="Select Cover Letter"
                            onValueChanged={this.artistApplicationInputChanged}
                        />
                    </div>
                    <div className="application-section">
                        <h1>Existing Porfolio(s) (Optional):</h1>
                        <ListInput
                            ref={this.existingPortfolioInput}
                            listLabel="Existing Portfolio Links"
                            inputLabel="Portfolio Link"
                        />
                    </div>
                    <div className="application-section">
                        <h1>Sanitization Quiz (Required):</h1>
                        <SanitizationQuiz
                            ref={this.sanitizationQuiz}
                            quizQuestions={this.props.currentSanitizationQuizQuestions}
                            onQuizAnswerChanged={this.artistApplicationInputChanged}
                        />
                    </div>
                </FormInfoDisplay>
                {this.renderSubmitButton()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSession: state.sessionReducer.currentSession,
        fetchingCreateArtistApplication: state.artistApplicationReducer.fetchingCreateArtistApplication,
        artistApplicationSubmitted: state.artistApplicationReducer.artistApplicationSubmitted,
        currentSanitizationQuizQuestions: state.sanitizationQuizReducer.currentSanitizationQuizQuestions,
        fetchingSanitizationQuizQuestions: state.sanitizationQuizReducer.fetchingSanitizationQuizQuestions
    };
}

ArtistApplication.propTypes = {
    setCurrentPage: PropTypes.func.isRequired,
    createArtistApplication: PropTypes.func.isRequired,
    getSanitizationQuizQuestions: PropTypes.func.isRequired,
    currentSession: PropTypes.shape({
        userId: PropTypes.number.isRequired,
        displayName: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        isArtist: PropTypes.number.isRequired,
        isClient: PropTypes.number.isRequired,
        clientProfileId: PropTypes.number,
        artistPortfolioId: PropTypes.number
    }).isRequired,
    fetchingCreateArtistApplication: PropTypes.bool.isRequired,
    artistApplicationSubmitted: PropTypes.bool.isRequired,
    currentSanitizationQuizQuestions: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchingSanitizationQuizQuestions: PropTypes.bool.isRequired
};

export default withRouter(connect(
    mapStateToProps,
    {
        createArtistApplication,
        getSanitizationQuizQuestions,
        setCurrentPage
    }
)(ArtistApplication));
