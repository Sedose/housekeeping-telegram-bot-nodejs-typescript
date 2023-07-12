interface DutySchedule {
    userId: number; // ID of the user who is on duty
    dutyId: number; // ID of the duty
    startDate: Date; // Start date of the duty
    endDate: Date; // End date of the duty
}

export { DutySchedule };
