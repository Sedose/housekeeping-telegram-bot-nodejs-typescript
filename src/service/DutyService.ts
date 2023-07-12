import { DutySchedule } from 'domain/DutySchedule.js';

interface DutyService {
    getDutyForToday: () => DutySchedule;
}

export { DutyService };
