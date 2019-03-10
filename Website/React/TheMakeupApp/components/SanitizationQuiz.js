import PropTypes from 'prop-types';
import React from 'react';

import SanitizationQuizQuestion from './SanitizationQuizQuestion';

import '../../../Css/SanitizationQuiz.css';

class SanitizationQuiz extends React.Component {
    static doesQuestionHaveAnswer(questionRef) {
        return questionRef.current.hasAnswer();
    }

    constructor(props) {
        super(props);
        this.state = {
            questionRefs: props.quizQuestions.map(() => { return React.createRef(); })
        };
        this.getQuizAnswers = this.getQuizAnswers.bind(this);
        this.isCompleted = this.isCompleted.bind(this);
        this.renderQuizQuestion = this.renderQuizQuestion.bind(this);
    }

    getQuizAnswers() {
        return this.state.questionRefs.map((quizQuestion) => { return quizQuestion.current.getAnswer(); });
    }

    isCompleted() {
        return this.state.questionRefs.every((question) => { return question.current.hasAnswer(); });
    }

    renderQuizQuestion(question) {
        const questionRef = this.state.questionRefs[this.props.quizQuestions.indexOf(question)];
        return (
            <SanitizationQuizQuestion
                ref={questionRef}
                key={question.sanitizationQuizQuestionId}
                quizQuestion={question}
                onAnswerSelected={this.props.onQuizAnswerChanged}
            />
        );
    }

    render() {
        return (
            <div className="sanitization-quiz">
                {this.props.quizQuestions.map((question) => { return this.renderQuizQuestion(question); })}
            </div>
        );
    }
}

SanitizationQuiz.propTypes = {
    quizQuestions: PropTypes.arrayOf(PropTypes.object),
    onQuizAnswerChanged: PropTypes.func
};

SanitizationQuiz.defaultProps = {
    quizQuestions: [],
    onQuizAnswerChanged: () => {}
};

export default SanitizationQuiz;
