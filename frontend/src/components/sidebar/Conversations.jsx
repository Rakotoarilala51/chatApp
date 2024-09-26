
import useGetConversation from "../../hooks/useGetConversation";
import Conversation from "./Conversation";

const Conversations = () => {
	const{loading, conversations}=useGetConversation()
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((conversation) => (
				<Conversation key={conversation.id} conversation={conversation} />
			))}
		{loading?(<span className="loading loading-spinner mx-auto"/>):null}
		</div>
	);
};
export default Conversations;
