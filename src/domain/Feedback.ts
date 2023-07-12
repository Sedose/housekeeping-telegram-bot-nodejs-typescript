interface Feedback {
    feedbackId: number;
    userId: number;
    dutyId: number;
    feedbackScore: boolean; // or number, depending on how you want to score
    feedbackDate: Date;
}
