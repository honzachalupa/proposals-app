export default interface IProposal {
    id: string;
    content: string;
    description: string;
    lifeSpan: number;
    members: string[];
    responses: {
        [key: string]: boolean;
    };
    isSensitive: boolean;
    createdBy: string;
    createdOn: Database.Timestamp;
    updatedBy: string;
    updatedOn: Database.Timestamp;
}
