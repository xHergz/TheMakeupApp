import PropTypes from 'prop-types';
import React from 'react';

import RadioButtonInput from '../../Common/components/RadioButtonInput';

class SanitizationQuizQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.getAnswer = this.getAnswer.bind(this);
        this.hasAnswer = this.hasAnswer.bind(this);
        this.answerInput = React.createRef();
    }

    getAnswer() {
        return {
            sanitizationQuizQuestionId: this.props.quizQuestion.sanitizationQuizQuestionId,
            sanitizationQuizAnswerId: this.answerInput.current.getValue()
        };
    }

    hasAnswer() {
        return this.answerInput.current.getValue() !== null;
    }

    render() {
        return (
            <RadioButtonInput
                ref={this.answerInput}
                label={this.props.quizQuestion.question}
                options={this.props.quizQuestion.answers}
                labelKey="answer"
                valueKey="sanitizationQuizAnswerId"
                onValueChanged={this.props.onAnswerSelected}
            />
        );
    }
}

SanitizationQuizQuestion.propTypes = {
    quizQuestion: PropTypes.shape({
        sanitizationQuizQuestionId: PropTypes.number.isRequired,
        question: PropTypes.string.isRequired,
        answers: PropTypes.arrayOf(PropTypes.shape({
            sanitizationQuizAnswerId: PropTypes.number.isRequired,
            answer: PropTypes.string.isRequired
        })).isRequired
    }).isRequired,
    onAnswerSelected: PropTypes.func
};

SanitizationQuizQuestion.defaultProps = {
    onAnswerSelected: () => {}
};

export default SanitizationQuizQuestion;
