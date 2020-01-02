export default interface IProposal {
    id: string;
    content: string;
    description: string;
    lifeSpan: number;
    members: string[];
    responses: {
        [key: string]: boolean;
    };
    createdBy: string;
    createdAt: Database.Timestamp;
}
